<script lang="ts">
	import HelpCircle from '$lib/icons/HelpCircle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showOriginal = false;

	const resetPic = async () => {
		const response = await fetch(`/api/reset?secret=${data.secret}`);

		if (response.ok) {
			location.reload();
		} else {
			alert('something went wrong');
		}
	};
</script>

<svelte:head>
	<title>You are visit #{data.count}</title>
	<link rel="icon" href={'data: image/jpeg; base64,' + data.pic} />
</svelte:head>

<img
	src={showOriginal ? '/1.jpg' : 'data: image/jpeg; base64,' + data.pic}
	width={1920}
	height={1281}
	alt="image of a landscape compressed {data.count} times"
/>

<nav>
	<a class="about" href="/about"><HelpCircle /> About</a>

	<div class="buttons">
		{#if data.secret}
			<button on:click={resetPic}>Reset this picture for everyone</button>
		{/if}

		<button on:click={() => (showOriginal = !showOriginal)}>
			Show {showOriginal ? 'current' : 'original'}
		</button>
	</div>

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

<style>
	img {
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.buttons {
		position: absolute;
		left: 50%;
		bottom: 0.5rem;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	button {
		font-family: 'Urbanist';
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
		width: fit-content;
		transform: scale(1);
		transition: transform 200ms;
	}

	button:hover {
		transform: scale(1.05);
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
		color: black;
	}

	nav a {
		display: inline-flex;
		color: black;
	}

	.credits {
		font-size: 12px;
		margin: 0;
		background-color: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(10px);
		padding: 0.25rem 0.75rem;
		border-radius: 3rem;
	}

	.about {
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(10px);
		padding: 0.2rem;
		padding-right: 0.75rem;
		border-radius: 5rem;
		text-decoration: none;
		font-weight: bold;
		gap: 0.5rem;
		transition: transform 200ms;
	}

	.about:hover {
		transform: scale(1.05);
	}
</style>
