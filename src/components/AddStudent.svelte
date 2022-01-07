<script>
	import Header from "./Header.svelte";
	import Vertical from "../shared/Vertical.svelte"
	import Nav from "./Nav.svelte"
	import MainContent from "./MainContent.svelte";
    import { TextField } from "smelte";
    import {Button,Icon} from "smelte";
    import {Snackbar,notifier, Notifications, } from "smelte";

    let showSnackbar = false;
    let showSnackbarTop = false;
    let showSnackbarBottomLeft = false;

    
    let message = "";
    export let active

	let activeAddStudent = active

    let fields = {firstName:"", lastName:"", otherName:"", username:"", gender:"", department:"", faculty:"", state:"", level:"", email:"", phone:"", course:"", address:"", role:"student", dob:""}
    let errors = {firstName:"", lastName:"", otherName:"", username:"", gender:"", department:"", faculty:"", state:"", level:"", email:"", phone:"", course:"", address:"", role:"", dob:""}
    let valid = false

    const submitHandler = async () => {
        valid = true
console.log('hello')
       
        if(fields.firstName.trim().length < 1){
            valid = false
            errors.firstName = 'First Name must not be empty'
        }else{
            errors.firstName = ''
        }

        if(fields.lastName.trim().length < 1){
            valid = false
            errors.lastName = ' must not be empty'
        }else{
            errors.lastName= 'Last Name must not be empty'
        }

        if(fields.otherName.trim().length < 1){
            valid = false
            errors.otherName = 'Other Name must not be empty'
        }else{
            errors.otherName = ''
        }

        if(fields.username.trim().length < 1){
            valid = false
            errors.username = 'ID Number must not be empty'
        }else{
            errors.username = ''
        }

        if(fields.faculty.trim().length < 1){
            valid = false
            errors.faculty = 'Faculty must not be empty'
        }else{
            errors.faculty = ''
        }

        if(fields.department.trim().length < 1){
            valid = false
            errors.department = 'Department must not be empty'
        }else{
            errors.department = ''
        }

        if(fields.state.trim().length < 1){
            valid = false
            errors.state = 'state must not be empty'
        }else{
            errors.state = ''
        }

        if(fields.gender.trim().length < 1){
            valid = false
            errors.gender = 'Gender must not be empty'
        }else{
            errors.gender = ''
        }

        if(fields.level.trim().length < 1){
            valid = false
            errors.level = 'Level Name must not be empty'
        }else{
            errors.level = ''
        }

        if(fields.email.trim().length < 1){
            valid = false
            errors.email = 'Email must not be empty'
        }else{
            errors.email = ''
        }

        if(fields.phone.trim().length < 1){
            valid = false
            errors.phone = 'Phone must not be empty'
        }else{
            errors.phone = ''
        }

        if(fields.course.trim().length < 1){
            valid = false
            errors.course = 'Course must not be empty'
        }else{
            errors.course = ''
        }

        if(fields.dob.trim().length < 1){
            valid = false
            errors.dob = 'DOB must not be empty'
        }else{
            errors.dob = ''
        }

        if(fields.address.trim().length < 1){
            valid = false
            errors.address = 'Address must not be empty'
        }else{
            errors.address = ''
        }
        if(valid){
             try {

            console.log(fields)    
            const rawResponse = await fetch('https://smart-identificatio.herokuapp.com/admin/register', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
            });
            const content = await rawResponse.json();

            console.log(content)
            if(content.success == true){
                message = "student added"
                showSnackbar = true
               
            }else{
                message = "Email already exist"
                showSnackbarTop = true
            }
            
                
            } catch (error) {
                console.log(error)
                message = error
                showSnackbarTop = true
            }
            
        }else{

            message = "You left a required filled empty"
            showSnackbarTop = true
        }
    }
</script>

<div class="main">
	<Nav activeAddStudent/>
	<Vertical/>

	
    <div class="align">
        <Header/>
        <form action="" class="form" >
            <div>
                <TextField required label="First Name" outlined hint="First Name" bind:value={fields.firstName} />

            </div>

            <div>

                <TextField required label="Surname" outlined hint="Surname" bind:value={fields.lastName}/>
            </div>

            <div>

                <TextField required label="Other Name" outlined hint="Other Name" bind:value={fields.otherName}/>
            </div>

            <div>

                <TextField required label="ID Number" outlined hint="ID" bind:value={fields.username}/>
            </div>

            <div>

                <TextField required label="Gender" outlined hint="Male" bind:value={fields.gender}/>
            </div>

            <div>

                <TextField required label="State" outlined hint="State" bind:value={fields.state}/>
            </div>

            <div>

                <TextField required label="Department" outlined hint="Department" bind:value={fields.department}/>
            </div>

            <div>

                <TextField required label="Faculty" outlined hint="Faculty" bind:value={fields.faculty}/>
            </div>

            <div>

                <TextField required label="Level" outlined hint="Level" bind:value={fields.level}/>
            </div>

            <div>

                <TextField required label="DOB" outlined hint="dob" bind:value={fields.dob}/>
            </div>

            <div>

                <TextField required label="Course" outlined hint="course" bind:value={fields.course}/>
            </div>

            <div>

                <TextField required label="Address" outlined hint="address" bind:value={fields.address}/>
            </div>

            <div>

                <TextField required label="Phone" outlined hint="phone" bind:value={fields.phone}/>
            </div>

            <div>

                <TextField required label="email" outlined hint="email" bind:value={fields.email}/>
            </div>

            
            <div>

                <Button color="primary" dark block on:click={submitHandler}>ADD STUDENT</Button>
            </div>
        </form>
    </div>
</div>

<Snackbar noAction color="error" timeout={5000} top bind:value={showSnackbarTop}>
  <div>{message}!</div>
  <div slot="action" />
</Snackbar>
<Snackbar noAction color="success" timeout={5000}  bind:value={showSnackbar}>
    <div>{message}!</div>
    <div slot="action" />
  </Snackbar>
<style>
    .main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		background-color: #F7FAFF;
	}

    .align {
		max-width: 80vw;
	}

    .form {
        background-color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 1rem;
        padding: 2rem;
        margin-left: 2rem;
        margin-right: 2.3rem;
        border-radius: 10px;
    }

    .form > * {

        width: 30%;
    }
</style>