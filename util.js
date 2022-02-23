import fetch from 'node-fetch';

export async function gql(query) {
	const res = await fetch('https://api.hashnode.com/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({query}),
	});

    const json = await res.json();
    return json.data;
}

export const USER_QUERY = username => `{
	user(username: "${username}") {
		publicationDomain
		numFollowers
        numFollowing
        numPosts
        numReactions
	}
}`;

export const getUser = username => {
    return gql(USER_QUERY(username));
}

export const POSTS_QUERY = username => page => `{
    user(username: "${username}") {
        publication {
            posts(page: ${page}) {
                popularity
                totalReactions
            }
        }
    }
}`;

export async function getAllPosts(username, page = 0) {
    const posts = (await gql(POSTS_QUERY(username)(page))).user.publication.posts;

    if (posts.length > 0) {
        return posts.concat(await getAllPosts(username, page + 1));
    }

    return posts;
}

export function parse(data) {
    const posts = data.posts;

    delete data.posts;

    data.stats = {
        followers: data.user.numFollowers,
        following: data.user.numFollowing,
        posts: data.user.numPosts,
        reactions: data.user.numReactions,
        popularity: posts.map(post => post.popularity).reduce(sum),
    };

    return data;
}

export const sum = (a, b) => a + b;
