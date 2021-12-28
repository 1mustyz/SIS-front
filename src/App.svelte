<script>
	import "smelte/src/tailwind.css" ;
	import Header from "./components/Header.svelte";
	import Vertical from "./shared/Vertical.svelte"
	import Nav from "./components/Nav.svelte"
	import MainContent from "./components/MainContent.svelte";
</script>

<main>
	<Nav/>
	<Vertical/>

	<div class="align">
		<Header/>
		<MainContent/>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		background-color: #F7FAFF;
	}

	.align {
		max-width: 100vw;
	}
</style>