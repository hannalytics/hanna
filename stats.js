import {schedule} from '@netlify/functions';
import fetch from 'node-fetch';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/lib/data/user.json', 'utf8'));
console.log('Fetching stats for', data.name);

const POSTS_QUERY = username => (page = 0) => `{
	user(username: "${username}") {
		publicationDomain
		numFollowers
        numFollowing
        numPosts
        numReactions
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

    if (user.posts.length > 0) {
        user.publication.posts = user.publication.posts.concat(await fetchPaginatedAPI(username, page + 1).publication.posts);
    }

    return user;
}

const {username} = data;
const user = await fetchPaginatedAPI(username);

const prevPosts = JSON.parse(fs.readFileSync('src/lib/data/stats.json', 'utf8'));

prevPosts.push({
	timestamp: new Date().toISOString(),
    user
});

fs.writeFileSync('src/lib/data/stats.json', JSON.stringify(prevPosts));
