<script>
	
    import { TextField } from "smelte";
    import {Button,Icon} from "smelte";
    import Avatar from "../shared/Avatar.svelte";
	import { onMount } from 'svelte';


    export let params
    $: data = []
    const username = params.username.split('-').join('/')

    console.log(data)
    
    $: fields = {firstName:data.firstName, surname:data.lastName, otherName:data.otherName, username:data.username, gender:data.gender, department:data.department, faculty:data.faculty, state:data.state, level:data.level}
    let image = ''
   


    onMount(async () => {
    const response = await fetch(`https://smart-identificatio.herokuapp.com/admin/get-single-student/?username=${username}`)
    let res = await response.json()
    data = res.message
    console.log(data)
    try {
        
        image = 'https://smart-identificatio.herokuapp.com/' + data.image.split('/').splice(1).join('/')
    } catch (error) {
        console.log(error)
    }

    console.log(image)
  })
</script>

	
	
    <div class="align">

        <div class="profile-pic">
            <Avatar type="medium">
                <img class="img-avat" src={image} alt="">
            </Avatar>
            <TextField  outlined type="file"  />
            <Button color="primary" light flat >set</Button>


        </div>

        <form action="" class="form" >
            <div>
                <TextField label="First Name" outlined hint="First Name" disabled bind:value={fields.firstName} />

            </div>

            <div>

                <TextField label="Surname" outlined hint="Surname" disabled bind:value={fields.surname}/>
            </div>

            <div>

                <TextField label="Other Name" outlined hint="Other Name" disabled bind:value={fields.otherName}/>
            </div>

            <div>

                <TextField label="ID Number" outlined hint="ID" disabled bind:value={fields.username}/>
            </div>

            <div>

                <TextField label="Gender" outlined hint="Male" disabled bind:value={fields.gender}/>
            </div>

            <div>

                <TextField label="State" outlined hint="State" disabled bind:value={fields.state}/>
            </div>

            <div>

                <TextField label="Department" outlined hint="Department" disabled bind:value={fields.department}/>
            </div>

            <div>

                <TextField label="Faculty" outlined hint="Faculty" disabled bind:value={fields.faculty}/>
            </div>

            <div>

                <TextField label="Level" outlined hint="Level" disabled bind:value={fields.level}/>
            </div>

            <div>

                <Button color="primary" dark block >Print ID</Button>
            </div>
        </form>
    </div>


<style>
    

    .align {
		max-width: 90vw;
        display: flex;
		flex-direction: row;
		background-color: #F7FAFF;
        justify-content: space-between;
        padding: 7rem;
	}

    .form {
        background-color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 1rem;
        padding: 2rem;
        width: 60%;
        /* margin-left: 2rem;
        margin-right: 2.3rem; */
        border-radius: 10px;
    }

    .form > * {

        width: 30%;
    }

    .img-avat {
        border-radius: 75px;
        width: 10rem;
        height: 9.6rem;
    }

    .profile-pic {
        width: 30%;
        height: 20rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        /* margin: auto;
        margin-bottom: 2rem; */
        background-color: white;
        border-radius: 10px;
    }
</style>