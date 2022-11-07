<script>
	import LeftArrow from '$lib/icons/LeftArrow.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<nav>
	<a href="/"><LeftArrow /></a>
</nav>

<main>
	<h1>About this website</h1>

	<p>
		This website is a small experiment, where each visit to the page deteriorates the main image.
		Every 200 visitors a 'reset' button appears on the bottom. Clicking the button restores the
		image back to its original quality. You have to be quick though, the reset button only works for
		the next 5 visits, after that it's disabled again.
		<br />
		<br />
		You could see this deterioration as a metaphor for the effects of tourism, or how humanity affects
		nature, or whatever.
		<br />
		<br />
		The source code is available on
		<a href="https://github.com/kumpmati/jpeg" target="_blank" rel="noreferrer">GitHub</a>.
	</p>

	<img src="/1.jpg" alt="a landscape" />
</main>

<style>
	nav {
		position: fixed;
		display: flex;
		justify-content: space-between;
		bottom: 0;
		padding: 0.5rem;
	}

	nav a {
		display: inline-flex;
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
