<script>
	
    import { TextField } from "smelte";
    import {Button,Icon,ProgressLinear} from "smelte";
    import Avatar from "../shared/Avatar.svelte";
	import { onMount } from 'svelte';
	import SpinnerLoader from "../shared/loader/SpinnerLoader.svelte";

    
    import QRCode from "../shared/QRJS.svelte"

    // loader code progress
    let progress = 0;
    let load = false
    let wait = false

    function next() {
        setTimeout(() => {
        if (progress === 100) {
            progress = 0;
        }

        progress += 1;
        next();
        }, 100);
    }

    // next();
    // ends here

    export let params
    $: data = []
    const username = params.username.split('-').join('/')
    const secret = `https://sis-front-eight.vercel.app/student-profile/${params.username}`

    console.log(data)
    
    $: fields = {firstName:data.firstName, surname:data.lastName, otherName:data.otherName, username:data.username, gender:data.gender, department:data.department, faculty:data.faculty, state:data.state, level:data.level, active:data.active}
    let image = ''
   


    onMount(async () => {
    try {
        const response = await fetch(`https://smart-identificatio.herokuapp.com/admin/get-single-student/?username=${username}`)
        let res = await response.json()
        data = res.message
        console.log(data)
        wait = true
    } catch (error) {
        console.log(error)
    }
   
    try {
        
        image = 'https://smart-identificatio.herokuapp.com/' + data.image.split('/').splice(1).join('/')
    } catch (error) {
        console.log(error)
    }

    console.log(image)
  })

  const printId = () => {
    console.log('printing')
      
    window.print()
  }

  let  avatar, fileinput;
	
	const onFileSelected =(e)=>{
            load = true
            next()
            let img = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = e => {
                 avatar = e.target.result
            };
            console.log(avatar)
            const formData = new FormData();

            formData.append('profile_pic', img);

            fetch(`https://smart-identificatio.herokuapp.com/admin/set-profile-pic?username=${data.username}`, {
            method: 'PUT',
            body: formData
            })
            .then(response => response.json())
            .then(result => {
            console.log('Success:', result);
                data = result.message
                try {
                    
                    image = 'https://smart-identificatio.herokuapp.com/' + result.message.image.split('/').splice(1).join('/')
                    load = false
                } catch (error) {
                    console.log(error)
                }
            })
            .catch(error => {
            console.error('Error:', error);
            });
}
	

 
</script>

    {#if !wait}
        <p class="waiting"><SpinnerLoader /></p>
	{:else if fields.active && wait}
	
    <div class="align">

        <div class="profile-pic">
            <Avatar type="medium">
                <img class="img-avat" src={image} alt="">
            </Avatar>
            <TextField  outlined type="file" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} />
                {#if load}    
                <div class="loader">
                    <small class="mb-3">{progress}%</small>
                    <ProgressLinear {progress} />
                </div>
                {/if}

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

                <Button color="primary" dark block on:click={()=> printId()}>Print ID</Button>
            </div>
        </form>

        
        <div class="qr">
            <h4>Scan me</h4>
            <QRCode codeValue={secret} squareSize=200/>
        
        </div>
    </div>

    {:else if !fields.active && wait}
        <h2 class="not-active">UPS!! YOUR PROFILE IS DEACTIVATED</h2>

    {/if}
<style>
    

    .align {
		max-width: 100vw;
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

    .qr {
        margin-left: 3rem;
    }

    .qr > h4 {
        text-align: center;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
    }

    .not-active {
        margin: auto;
        width: 40%;
        margin-top: 4rem;
        background-color: orangered;
        color: white;
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
    }
    .loader {
        width: 100%;
    }
    .waiting {
		width: 30%;
		margin: auto;
		margin-left: 40rem;
		border-radius: 10px;
		margin-top: 10rem;
		
	}
</style>