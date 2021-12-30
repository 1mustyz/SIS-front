<script>
	import "smelte/src/tailwind.css" ;
	import router from "page"
	import Home from "./components/Home.svelte"
	import ViewStudent from "./components/ViewStudent.svelte";
	import LoginPage from "./components/LoginPgae.svelte";
	let page

	router('/', () => page = Home)
	router('/view-student', () => page = ViewStudent)
	router('/login', () => page = LoginPage)

router.start()
</script>

<main>
	<svelte:component this={page} />
</main>

<style>
		
</style>