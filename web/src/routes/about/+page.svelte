<script lang="ts">
	import { RESET_INTERVAL } from '$lib/config';
	import LeftArrow from '$lib/icons/LeftArrow.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<nav>
	<a href="/"><LeftArrow /></a>
</nav>

<main>
	<h1>About</h1>

	<p>
		This website is a small experiment, where each visit to the page deteriorates the main image.
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
</main>

<style>
	nav {
		position: fixed;
		display: flex;
		justify-content: space-between;
		bottom: 0;
		padding: 0.75rem;
	}

	nav a {
		display: inline-flex;
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
