<script>
	import _user from '$lib/data/user.json';
	import stats from '$lib/data/stats.json';

	const firstStat = stats[stats.length - 1] ?? { user: _user };

	const user = {
		..._user,
		...firstStat.user
	};
</script>

<div class="bg-russian-violet-600">
	<div class="container m-auto py-5">
		<img src={user.coverImage} alt="{user.name}'s banner" class="mb-10" />
		<div class="flex flex-1 justify-between items-center">
			<div>
				<h1 class="text-3xl font-bold">
					{user.name}
					<a href="https://hashnode.com/@{user.username}" class="text-blue-500 hover:text-blue-600"
						>(@{user.username})</a
					>
					{#if user.isEvangelist}
						<span
							class="inline-flex items-center justify-center mx-2
							px-2 py-1 text-xs font-bold leading-none text-russian-violet-100
							bg-russian-violet-700 rounded"
						>
							EVANGELIST!
						</span>
					{/if}
				</h1>
				<h2 class="text-lg text-gray-400">{user.tagline}</h2>
			</div>
			<div>
				<img src={user.photo} alt={user.name} class="rounded-full h-32" />
			</div>
		</div>

		<div class="flex justify-around w-max mb-4">
			<div class="border-gray-500">
				<h3 class="text-2xl font-bold">{user.numFollowers}</h3>
				<p class="text-lg font-semibold text-gray-400">Followers</p>
			</div>
			<div class="mx-5 border" />
			<div class="border-gray-500">
				<h3 class="text-2xl font-bold">{user.numFollowing}</h3>
				<p class="text-lg font-semibold text-gray-400">Following</p>
			</div>
			<div class="mx-5 border" />
			<div class="border-gray-500">
				<h3 class="text-2xl font-bold">{user.numPosts}</h3>
				<p class="text-lg font-semibold text-gray-400">Posts</p>
			</div>
			<div class="mx-5 border" />
			<div class="border-gray-500">
				<h3 class="text-2xl font-bold">{user.numReactions}</h3>
				<p class="text-lg font-semibold text-gray-400">Reactions</p>
			</div>
		</div>

		<div class="flex">
			{#if user.socialMedia.twitter}
				<a class="px-4 py-2" href={user.socialMedia.twitter} target="social">
					<svg
						class="text-blue-500 hover:text-blue-400"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
						/></svg
					>
				</a>
			{/if}

			{#if user.socialMedia.github}
				<a class="px-4 py-2" href={user.socialMedia.github} target="social">
					<svg
						class="text-gray-600 hover:text-gray-500"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
						/></svg
					>
				</a>
			{/if}

			{#if user.socialMedia.google}
				<a
					class="px-4 py-2 filter-none hover:filter brightness-200"
					href={user.socialMedia.google}
					target="social"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
							<path
								fill="#4285F4"
								d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
							/>
							<path
								fill="#34A853"
								d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
							/>
							<path
								fill="#FBBC05"
								d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
							/>
							<path
								fill="#EA4335"
								d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
							/>
						</g>
					</svg>
				</a>
			{/if}

			{#if user.socialMedia.website}
				<a class="px-4 py-2" href={user.socialMedia.website} target="social">
					<svg
						class="text-white hover:text-gray-300"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path
							d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
						/></svg
					>
				</a>
			{/if}

			{#if user.socialMedia.linkedin}
				<a class="px-4 py-2" href={user.socialMedia.linkedin} target="social">
					<svg
						class="text-blue-600 hover:text-blue-800"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						/><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg
					>
				</a>
			{/if}

			{#if user.socialMedia.stackoverflow}
				<a
					class="px-4 py-2 filter-none hover:filter brightness-125"
					href={user.socialMedia.stackoverflow}
					target="social"
				>
					<svg width="24" height="24" viewBox="0 0 169.61 200" xmlns="http://www.w3.org/2000/svg"
						><path d="M140.44 178.38v-48.65h21.61V200H0v-70.27h21.61v48.65z" fill="#bcbbbb" /><path
							d="M124.24 140.54l4.32-16.22-86.97-17.83-3.78 17.83zM49.7 82.16L130.72 120l7.56-16.22-81.02-37.83zm22.68-40l68.06 57.3 11.35-13.51-68.6-57.3-11.35 13.51zM116.14 0l-14.59 10.81 53.48 71.89 14.58-10.81zM37.81 162.16h86.43v-16.21H37.81z"
							fill="#f48024"
						/></svg
					>
				</a>
			{/if}
		</div>
	</div>
</div>
