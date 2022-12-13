<script>
	import Header from "./Header.svelte";
	import Vertical from "../shared/Vertical.svelte"
	import Nav from "./Nav.svelte"
	import MainContent from "./MainContent.svelte";
	import Table from "../shared/Table.svelte"
	import { onMount } from 'svelte';
	import { students } from "../stores";
	import SpinnerLoader from "../shared/loader/SpinnerLoader.svelte";
	export let active


	
	async function getStudent(){
		const res = await fetch(`https://smart-id.fly.dev/admin/get-all-student`);
		return student = await res.json();
	}
	let student = getStudent()

    let activeViewStudent = active
</script>

<div class="main">
	<Nav activeViewStudent/>
	<Vertical/>

	
    <div class="align">
        <Header />

		{#await student}
			<p class="waiting"><SpinnerLoader /></p>
		{:then}
        	<Table {student} />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
    </div>
</div>

<style>
    .main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		background-color: #F7FAFF;
	}

    .align {
		min-width: 78vw;
	}

	.waiting {
		width: 30%;
		margin: auto;
		margin-left: 28rem;
		border-radius: 10px;
		margin-top: 10rem;
		
	}
</style>