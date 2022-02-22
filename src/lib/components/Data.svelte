<script>
import {LineChart} from '@carbon/charts-svelte';
import '@carbon/charts/styles-g100.min.css';
import 'carbon-components/css/carbon-components.min.css';

import { onMount } from 'svelte';

import data from '$lib/data/posts.json';

function roundToHour(date) {
	const p = 60 * 60 * 1000; // milliseconds in an hour
	return new Date(Math.round(date.getTime() / p) * p);
}

const niceDate = date => roundToHour(new Date(date)).toLocaleString('en-US', {
	month: 'short',
	day: 'numeric',
	hour: 'numeric',
});

// TODO: put this in script
const followersData = data.map(x => ({
	group: 'followers',
	key: niceDate(x.timestamp),
	value: x.followers,
}));
const followersOptions = {
	title: 'Followers over time',
	height: '400px',
	axes: {
		bottom: {
			title: 'Time',
			mapsTo: 'key',
			scaleType: 'labels'
		},
		left: {
			title: 'popularity',
			mapsTo: 'value',
			scaleType: 'linear'
		}
	},
	curve: 'curveMonotoneX'
}

const popularityData = data.map(x => ({
	group: 'popularity',
	key: niceDate(x.timestamp),
	value: x.posts.reduce((acc, cur) => acc + cur.popularity, 0)
}));
const popularityOptions = {
	title: 'Popularity over time',
	height: '400px',
	axes: {
		bottom: {
			title: 'Time',
			mapsTo: 'key',
			scaleType: 'labels'
		},
		left: {
			title: 'Popularity',
			mapsTo: 'value',
			scaleType: 'linear'
		}
	},
	curve: 'curveMonotoneX'
}

const reactionsData = data.map(x => ({
	group: 'Reactions',
	key: niceDate(x.timestamp),
	value: x.posts.reduce((acc, cur) => acc + cur.totalReactions, 0)
}));
const reactionsOptions = {
	title: 'Reactions over time',
	height: '400px',
	axes: {
		bottom: {
			title: 'Time',
			mapsTo: 'key',
			scaleType: 'labels'
		},
		left: {
			title: 'Reactions',
			mapsTo: 'value',
			scaleType: 'linear'
		}
	},
	curve: 'curveMonotoneX'
}

</script>

<div class='container p-10 bg-russian-violet-900 text-white'>
	<LineChart
		data={followersData}
		options={followersOptions}
	/>

	<div class='h-10'></div>

	<LineChart
		data={popularityData}
		options={popularityOptions}
	/>

	<div class='h-10'></div>

	<LineChart
		data={reactionsData}
		options={reactionsOptions}
	/>
</div>
