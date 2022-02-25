<script>
import Line from 'svelte-chartjs/src/Line.svelte'
import data from '$lib/data/stats.json';

function roundToHour(date) {
    const p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p) * p);
}

let length = 24;

const niceDate = date => new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
});

$: labels = data.map(d => niceDate(d.timestamp)).slice(-length);
const options = {
    scaleFontColor: '#fff',
};

$: d1 = {
    labels,
    datasets: [
        {
            label: 'Followers',
            data: data.map(d => d.stats.followers).slice(-length),
            fill: false,
            borderColor: '#FFFFB3',
            tension: 0.1
        },
        {
            label: 'Following',
            data: data.map(d => d.stats.following).slice(-length),
            fill: false,
            borderColor: '#DCAB6B',
            tension: 0.1
        },
    ]
}

$: d2 = {
    labels,
    datasets: [
        {
            label: 'Posts',
            data: data.map(d => d.stats.posts).slice(-length),
            fill: false,
            borderColor: '#8C93A8',
            tension: 0.1
        },
    ]
};

$: d3 = {
    labels,
    datasets: [
        {
            label: 'Reactions',
            data: data.map(d => d.stats.reactions).slice(-length),
            fill: false,
            borderColor: '#ee5622',
            tension: 0.1
        },
    ]
};


$: d4 = {
    labels,
    datasets: [
        {
            label: 'Popularity',
            data: data.map(d => d.stats.popularity).slice(-length),
            fill: false,
            borderColor: '#e234e2',
            tension: 0.1
        },
    ]
};
</script>

<div class='p-5 sm:p-10 bg-russian-violet-900 text-white w-screen xl:w-[75vw] mx-auto'>
	<ul class='flex flex-wrap border-b border-gray-200 border-gray-700'>
		<button on:click={e => length = 24}>Today</button>
		<button on:click={e => length = 168}>This week</button>
		<button on:click={e => length = 720}>This Month</button>
		<button on:click={e => length = Infinity}>Everything</button>
	</ul>
	<div class='h-20'></div>

	<Line data={d1} {options}/>
	<div class='h-20'></div>

	<Line data={d2} {options}/>
	<div class='h-20'></div>

	<Line data={d3} {options}/>
	<div class='h-20'></div>

	<Line data={d4} {options}/>
</div>

<style>
button {
	@apply font-bold py-2 px-4 rounded;
	@apply bg-russian-violet-500 text-white;
	@apply m-2;
}

button:hover {
	@apply bg-russian-violet-700;
}
</style>
