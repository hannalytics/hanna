import {schedule} from '@netlify/functions';
import fetch from 'node-fetch';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/lib/data/user.json', 'utf8'));

const POSTS_QUERY = username => (page = 0) => `{
	user(username: "${username}") {
		publicationDomain
		publication {
			posts(page: ${page}) {
				cuid
				type
				popularity
				totalReactions
			}
		}
	};
}`;

async function fetchPaginatedAPI(username, page = 0) {
	const res = await fetch('https://api.hashnode.dev/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({query: POSTS_QUERY(username)(page)}),
	});

	const json = await res.json();
	const posts = json.data.user.publication.posts;
	
	if (posts.length) {
		return [...posts, ...await fetchPaginatedAPI(username, page + 1)];
	} else {
		return posts;
	}
}

const _handler = async function() {
	const {username} = data;
	const morePosts = await fetchPaginatedAPI(username);

	const prevPosts = JSON.parse(fs.readFileSync('src/lib/data/posts.json', 'utf8'));

	prevPosts.push({
		timestamp: new Date().toISOString(),
		posts: morePosts,
	});

	fs.writeFileSync('src/lib/data/posts.json', JSON.stringify(prevPosts));

	return {
		statusCode: 200,
	};
};

export const handler = schedule("@hourly", _handler);
