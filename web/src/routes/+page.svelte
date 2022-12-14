<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import HelpCircle from '$lib/icons/HelpCircle.svelte';
	import type { PictureState } from '$lib/types';

	export let data: PictureState;

	let showOriginal = false;

	const resetPic = async () => {
		const response = await fetch(`${PUBLIC_API_URL}/api/reset?id=${data.id}&secret=${data.resetSecret}`);

		if (response.ok) {
			alert('reset successfully!');
			location.reload();
		} else {
			const err = await response.json();
			alert(`error: ${err.message}`);
		}
	};
</script>

<svelte:head>
	<title>Current count: {data.count}</title>
	<link rel="icon" href={'data: image/jpeg; base64,' + data.image} />
</svelte:head>

<img
	src={showOriginal ? `${PUBLIC_API_URL}/static/${data.meta.file}` : 'data: image/jpeg; base64,' + data.image}
	width={1280}
	height={720}
	alt="image of a landscape compressed {data.count} times"
/>

<nav>
	<div class="pill">
		<a class="about" href="/about"><HelpCircle /></a>
		<p class="visit-count">{data.count} visits since last reset</p>
	</div>

	<div class="buttons">
		{#if data.resetSecret}
			<button on:click={resetPic}>Reset this picture for everyone</button>
		{/if}

		<button on:click={() => (showOriginal = !showOriginal)}>
			Show {showOriginal ? "current" : "original"}
		</button>
	</div>

	<p class="credits">
		Photo by <a href={data?.meta?.link ?? 'https://unsplash.com/@baileyzindel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'}>
			{data?.meta?.author ?? 'Bailey Zindel'}
		</a>
		on
		<a href="https://unsplash.com/s/photos/landscape?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
			Unsplash
		</a>
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

	.visit-count {
		color: #000;
		font-size: 13px;
		margin: 0;
		z-index: 1;
		padding-right: .5rem;
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
		z-index: 2;
		width: fit-content;
	}

	@media screen and (max-width: 700px) {
		.buttons {
			bottom: 3rem;
		}
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
		font-size: 13px;
		margin: 0;
		padding: 0.25rem 0.75rem;
		border-radius: 3rem;
		z-index: -1;
		text-align: right;
		color: #fff;
	}

	.credits a {
		color: #fff;
	}

	.pill {
		display: flex;
		align-items: center;
		padding: 0.2rem;
		border-radius: 5rem;
		text-decoration: none;
		font-weight: bold;
		gap: 0.5rem;
		transition: transform 200ms;
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(10px);
	}

	.about:hover {
		transform: scale(1.05);
	}
</style>
