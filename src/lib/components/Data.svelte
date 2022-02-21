<script>
import {LineChart} from '@carbon/charts-svelte';
import '@carbon/charts/styles-g100.min.css';
import 'carbon-components/css/carbon-components.min.css';

import { onMount } from 'svelte';

import data from '$lib/data/posts.json';

const niceDate = date => new Date(date).toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  weekDay: 'long'
});

// TODO: put this in script
const popularityData = data.map(x => ({
	group: 'Popularity',
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
		data={popularityData}
		options={popularityOptions}
	/>

	<div class='h-10'></div>

	<LineChart
		data={reactionsData}
		options={reactionsOptions}
	/>
</div>
