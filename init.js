import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const GRAPHQL_QUERY = username => `{
	user(username: "${username}") {
		username
		name
		tagline
		isEvangelist
		socialMedia {
			twitter
			github
			stackoverflow
			linkedin
			google
			facebook
			website
		}
		numFollowing
		numFollowers
		photo
		coverImage
		numPosts
		numReactions
		blogHandle
		publicationDomain
	}
}`;

console.log(`
Thanks for using Hanna!

This CLI tool will help you set up your Hanna instance.
It will fetch your hashnode account data.
`);

rl.question('What is you hashnode username? ', async answer => {
	const res = await fetch('https://api.hashnode.com', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: GRAPHQL_QUERY(answer),
		}),
	});

	const {data: {user}} = await res.json();

	if (user.name === undefined || user.name === null) {
		console.log('Invalid username!');
		process.exit(1);
	}

	console.log('Fetched user.');
	fs.writeFileSync('src/lib/data/user.json', JSON.stringify(user, null, 2));

	rl.close();
})
