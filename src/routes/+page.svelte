<script lang="ts">
	import { RESET_INTERVAL } from '$lib/config';
	import type { PageData } from './$types';

	export let data: PageData;

	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<main>
	<h1>About</h1>

	<p>
		This website was a small experiment, where each visit to the page deteriorates the main image.
		Every {RESET_INTERVAL} visitors a reset button appears on the bottom, which can be used to restore
		the image back to its original quality.
		<br />
		<br />
		You could see this website as a metaphor for the effects of tourism, how humanity affects nature,
		or how meme quality degrades over time as they are shared.
		<br />
		<br />
		The source code is available on
		<a href="https://github.com/kumpmati/jpeg" target="_blank" rel="noreferrer">GitHub</a>.
	</p>

	<p>
		<b>
			I had to shut the page down due to rapidly rising database costs, I wonder what could have
			brought that... :) Thanks for visiting!
		</b>
	</p>

	<h2>History of the page</h2>
	<ul class="history">
		{#each data.pics.sort((a, b) => b.date.getTime() - a.date.getTime()) as pic}
			<li class="history-item">
				<h3>{pic.date.toLocaleString()}</h3>
				<p>Final count: <b>{pic.count}</b></p>
				<img
					src={'data: image/jpeg; base64,' + pic.image}
					alt="state of the picture on {pic.date}"
				/>
			</li>
		{/each}
	</ul>
</main>

<style>
	.history {
		display: flex;
		gap: 2rem;
		flex-direction: column;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.history-item h3,
	.history-item p {
		margin: 0.25rem 0;
	}

	img {
		width: 100%;
		border-radius: 0.5rem;
	}

	main {
		margin: 0 auto;
		margin-top: 10rem;
		margin-bottom: 5rem;
		max-width: 30rem;
	}

	p {
		font-family: Arial, Helvetica, sans-serif;
		color: rgb(212, 212, 212);
		line-height: 1.5;
	}
</style>
