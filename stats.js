import fs from 'fs';
import {getUser, getAllPosts, parse} from './util.js';

const data = JSON.parse(fs.readFileSync('src/lib/data/user.json', 'utf8'));
console.log('Fetching stats for', data.name);

const {username} = data;
const rawData = {
    ...await getUser(username),
    posts: await getAllPosts(username),
};
const parsed = parse(rawData);

const prevPosts = JSON.parse(fs.readFileSync('src/lib/data/stats.json', 'utf8'));

prevPosts.push({
	timestamp: new Date().toISOString(),
    ...parsed
});

fs.writeFileSync('src/lib/data/stats.json', JSON.stringify(prevPosts, null, 2));
