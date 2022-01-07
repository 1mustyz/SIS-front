<script>
	import Header from "./Header.svelte";
	import Vertical from "../shared/Vertical.svelte"
	import Nav from "./Nav.svelte"
	import MainContent from "./MainContent.svelte";
    import { TextField } from "smelte";
    import {Button,Icon} from "smelte";
    import Avatar from "../shared/Avatar.svelte";

    import {user} from "../stores"

    let image
    let fields = {firstName:'', surname:'', otherName:'', lastName:'', email:'', phone:'', role:''}
    if($user != null){
        try {
            image = 'https://smart-identificatio.herokuapp.com/' + $user.image.split('/').splice(1).join('/')
            console.log(image)
        } catch (error) {
            console.log(error)
            
        }
       

        fields = {firstName:$user.firstName, lastName:$user.lastName, otherName:$user.otherName, username:$user.username, email:$user.email, phone:$user.phone, role:$user.role}
    }

    export let active

    let activeProfile = active

    let  avatar, fileinput;
	
	const onFileSelected =(e)=>{
            let img = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = e => {
                 avatar = e.target.result
            };
            console.log(avatar)
            const formData = new FormData();

            formData.append('profile_pic', img);

            fetch(`https://smart-identificatio.herokuapp.com/admin/set-profile-pic?username=${fields.username}`, {
            method: 'PUT',
            body: formData
            })
            .then(response => response.json())
            .then(result => {
            console.log('Success:', result);
                user.set(result.message)

                try {
                    
                    image = 'https://smart-identificatio.herokuapp.com/' + result.message.image.split('/').splice(1).join('/')
                } catch (error) {
                    console.log(error)
                }
            })
            .catch(error => {
            console.error('Error:', error);
            });
}
	 
    
</script>

<div class="main">
	<Nav activeProfile/>
	<Vertical/>

	
    <div class="align">
        <Header />

        <div class="profile-pic">
            <Avatar type="medium">
                <img class="img-avat" src={image} alt="">
            </Avatar>
            <TextField  outlined type="file" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} />


        </div>

        <form action="" class="form" >
            <div>
                <TextField label="First Name" outlined hint="First Name" disabled bind:value={fields.firstName} />

            </div>

            <div>

                <TextField label="Surname" outlined hint="Surname" disabled bind:value={fields.lastName}/>
            </div>

            <div>

                <TextField label="Other Name" outlined hint="Other Name" disabled bind:value={fields.otherName}/>
            </div>

            <div>

                <TextField label="ID Number" outlined hint="ID" disabled bind:value={fields.username}/>
            </div>

            <div>

                <TextField label="Gender" outlined hint="Male" disabled bind:value={fields.email}/>
            </div>

            <div>

                <TextField label="State" outlined hint="State" disabled bind:value={fields.phone}/>
            </div>

            <div>

                <TextField label="Department" outlined hint="Department" disabled bind:value={fields.role}/>
            </div>

           
        </form>
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
		max-width: 78vw;
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
        margin: auto;
        margin-bottom: 2rem;
        background-color: white;
        border-radius: 10px;
    }
</style>