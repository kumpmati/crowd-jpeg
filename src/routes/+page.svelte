<script lang="ts">
	import { RESET_THRESHOLD } from '$lib/config';
	import type { PageData } from './$types';

	export let data: PageData;

	const canReset = data.count > 5 && data.count % RESET_THRESHOLD <= 5;

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
	alt="beluga cat #{data.count}"
/>

<p class="credits">
	Photo by
	<a
		href="https://unsplash.com/@baileyzindel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
		>Bailey Zindel</a
	>
	on
	<a
		href="https://unsplash.com/s/photos/landscape?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
		>Unsplash</a
	>
</p>

{#if canReset}
	<button on:click={resetPic}>reset</button>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;800&display=swap');

	:global(:root) {
		font-family: 'Urbanist';
	}

	:global(body) {
		margin: 0;
	}

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
		bottom: 1rem;
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

	.credits {
		color: white;
		font-size: 12px;
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		margin: 0;
	}

	.credits a {
		color: white;
	}
</style>
