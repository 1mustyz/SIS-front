<script>
	import "smelte/src/tailwind.css" ;
	import router from "page"
	import Home from "./components/Home.svelte"
	import ViewStudent from "./components/ViewStudent.svelte";
	import LoginPage from "./components/LoginPgae.svelte";
	import AddStudent from "./components/AddStudent.svelte";
	import StaffProfile from "./components/StaffProfile.svelte";
	import StudentProfile from "./components/StudentProfile.svelte";
	import { user } from "./stores";
	
	
	let page, params

	router('/', () => {
		if($user == null){
			router.redirect('/login')
		} 
		page = Home
	})
	router('/view-student', () => page = ViewStudent)
	router('/login', () => {
		user.set(null)
		page = LoginPage
	})
	router('/add-student', () => page = AddStudent)
	router('/staff-profile', () => page = StaffProfile)
	router('/student-profile/:username',
			(ctx, next) => {
			params = ctx.params
			next()
		},
	 () => page = StudentProfile)

	let active = true

router.start()
</script>

<main>
	<svelte:component this={page} params="{params}" />
</main>

<style>
		
</style>