<script lang="ts">
	import { RESET_INTERVAL } from '$lib/config';

	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<main>
	<h1>About</h1>

	<p>
		This website was a small experiment, where each visit to the page deteriorated the main image.
		Every {RESET_INTERVAL} visitors a reset button would appear on the bottom, which could be used to restore
		the image back to its original quality.
		<br />
		<br />
		You could see this website as a metaphor for the effects of tourism, how humanity affects nature,
		or how meme quality degrades over time as they are shared.
		<br />
		<br />
		<b>I've since had to put the website into static mode, since the running costs quickly became too high.</b>
	</p>

	<h2>Timelapse</h2>

	<p>
		I coded a snapshot mechanism to the backend, which saved the current state of the website every 30 seconds.
		You can see a timelapse of the first 11 days of the website's state here:
	</p>
	
	<iframe
		src="https://www.youtube.com/embed/gudBr1fRzbk" 
		title="YouTube video player" 
		frameborder="0" 
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
		allowfullscreen
	/>

	<p>
		P.S. If you choose to post a website/project that you made to Reddit or a similar high-traffic website,
		you have to be really sure that your wallet can handle it.
		<br/>
		<b>Especially if you deploy anything serverlessly!</b> (speaking from experience 🙂)
	</p>
	<br/>
	<p>
		The source code for the website is available on
		<a href="https://github.com/kumpmati/jpeg" target="_blank" rel="noreferrer">GitHub</a>.
	</p>
</main>

<style>
	main {
		margin: 0 auto;
		margin-top: 10rem;
		margin-bottom: 5rem;
		max-width: 35rem;
		padding: 0 1rem;
	}

	iframe {
		width: 100%;
		aspect-ratio: 560/315;
		
	}

	p {
		font-family: Arial, Helvetica, sans-serif;
		color: rgb(212, 212, 212);
		line-height: 1.5;
	}
</style>
