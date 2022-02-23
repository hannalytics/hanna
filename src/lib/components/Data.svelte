<script>
import Line from "svelte-chartjs/src/Line.svelte"
import data from '$lib/data/stats.json';

function roundToHour(date) {
    const p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p) * p);
}

const niceDate = date => new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
});

const labels = data.map(d => niceDate(d.timestamp));
const options = {
    scaleFontColor: '#fff',
};

const d1 = {
    labels,
    datasets: [
        {
            label: 'Followers',
            data: data.map(d => d.stats.followers),
            fill: false,
            borderColor: '#FFFFB3',
            tension: 0.1
        },
        {
            label: 'Following',
            data: data.map(d => d.stats.following),
            fill: false,
            borderColor: '#DCAB6B',
            tension: 0.1
        },
    ]
}

const d2 = {
    labels,
    datasets: [
        {
            label: 'Posts',
            data: data.map(d => d.stats.posts),
            fill: false,
            borderColor: '#8C93A8',
            tension: 0.1
        },
    ]
};

const d3 = {
    labels,
    datasets: [
        {
            label: 'Reactions',
            data: data.map(d => d.stats.reactions),
            fill: false,
            borderColor: '#ee5622',
            tension: 0.1
        },
    ]
};


const d4 = {
    labels,
    datasets: [
        {
            label: 'Popularity',
            data: data.map(d => d.stats.popularity),
            fill: false,
            borderColor: '#e234e2',
            tension: 0.1
        },
    ]
};
</script>

<div class='p-10 bg-russian-violet-900 text-white w-[75vw] m-auto'>
    <Line data={d1} {options}/>
    <Line data={d2} {options}/>
    <Line data={d3} {options}/>
    <Line data={d4} {options}/>
</div>
