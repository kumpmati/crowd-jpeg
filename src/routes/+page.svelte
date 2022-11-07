<script lang="ts">
	import { RESET_INTERVAL, RESET_THRESHOLD } from '$lib/config';
	import HelpCircle from '$lib/icons/HelpCircle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const canReset = data.count > RESET_THRESHOLD && data.count % RESET_INTERVAL <= RESET_THRESHOLD;

	const resetPic = async () => {
		const response = await fetch('/api/reset');
		if (response.ok) {
			location.reload();
		} else {
			alert('you were too slow');
		}
	};
</script>

<svelte:head>
	<title>#{data.count}</title>
	<link rel="icon" href={'data: image/jpeg; base64,' + data.pic} />
</svelte:head>

<img
	src={'data: image/jpeg; base64,' + data.pic}
	width={1920}
	height={1281}
	alt="image of a landscape compressed {data.count} times"
/>

<nav>
	<a class="about" href="/about"><HelpCircle /></a>

	<p class="credits">
		Photo by
		<a
			href="https://unsplash.com/@baileyzindel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
		>
			Bailey Zindel
		</a>
		on
		<a
			href="https://unsplash.com/s/photos/landscape?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
			>Unsplash</a
		>
	</p>
</nav>

{#if canReset}
	<button on:click={resetPic}>reset</button>
{/if}

<style>
	img {
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	button {
		font-family: 'Urbanist';
		position: absolute;
		bottom: 0.5rem;
		left: 50%;
		z-index: 100;
		border: none;
		color: rgb(0, 0, 0);
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(10px);
		font-size: 1rem;
		font-weight: bold;
		padding: 0.5rem 2rem;
		border-radius: 0.75rem;
		cursor: pointer;
		transform: translateX(-50%) scale(1);
		transition: transform 200ms;
	}

	button:hover {
		transform: translateX(-50%) scale(1.05);
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 0.5rem;
		width: 100%;
		z-index: 100;
		color: white;
	}

	nav a {
		display: inline-flex;
		color: white;
	}

	.credits {
		font-size: 12px;
		margin: 0;
	}
</style>
