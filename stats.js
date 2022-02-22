import {schedule} from '@netlify/functions';
import fetch from 'node-fetch';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/lib/data/user.json', 'utf8'));
console.log('Fetching stats for', data.name);

const POSTS_QUERY = username => (page = 0) => `{
	user(username: "${username}") {
		publicationDomain
		numFollowers
		publication {
			posts(page: ${page}) {
				cuid
				title
				type
				popularity
				totalReactions
			}
		}
	}
}`;

async function fetchPaginatedAPI(username, page = 0) {
	const res = await fetch('https://api.hashnode.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({query: POSTS_QUERY(username)(page)}),
	});

	const json = await res.json();
	const posts = json.data.user.publication.posts;
	const user = json.data.user;

	if (posts.length) {
		return {
			posts: [...posts, ...(await fetchPaginatedAPI(username, page + 1))],
			user
		};
	} else {
		return {posts, user};
	}
}

const {username} = data;
const morePosts = await fetchPaginatedAPI(username);

const prevPosts = JSON.parse(fs.readFileSync('src/lib/data/posts.json', 'utf8'));

prevPosts.push({
	timestamp: new Date().toISOString(),
	posts: morePosts,
});

fs.writeFileSync('src/lib/data/posts.json', JSON.stringify(prevPosts));
