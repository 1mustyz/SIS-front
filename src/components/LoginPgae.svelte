<script>
    import FaRegUser from 'svelte-icons/fa/FaRegUser.svelte'
    import { TextField } from "smelte";
    import {Button,Icon} from "smelte";
	import router from "page"
    import { user } from '../stores';
    

    let fields = {username: "", password: ""}
    let errors = {username: "", password: ""}
    let valid = false

    const submitHandler = async () => {
        valid = true

      
        if(fields.username.trim().length < 1){
            valid = false
            errors.username = 'id number A must not be empty'
        }else{
            errors.username = ''
        }

        if(fields.password.trim().length < 1){
            valid = false
            errors.password = 'password must not be empty'
        }else{
            errors.password = ''
        }

        if(valid){

            try {

                const data = {username:fields.username, password:fields.password}
            const rawResponse = await fetch('https://smart-identificatio.herokuapp.com/admin/login', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            const content = await rawResponse.json(data);

            console.log(content)
            if(content.success == true){

                user.set(content)
                router.redirect('/')
            }
            else {
            console.log('incorrect username or password')

            }
                
            } catch (error) {
                console.log(error)
            }
            
        }
    }

</script>

<div class="main">
    <div class="icon">
        <div class="avatar-icon">
            <FaRegUser />
        </div>
        <h6 class="text">Have an account?</h6>
    </div>

    <form action="" class="login" >
        <TextField label="ID NO." outlined hint="ID NO." bind:value={fields.username} />
        <TextField label="Password" outlined hint="Password" bind:value={fields.password} />
    </form>

    <div class="signin">
        <p class="text1">Sign In</p>
        <p class="text1">Forget Password</p>
    </div>

    <div class="btn" >
        <Button color="primary" dark block on:click={submitHandler}>Log In</Button>
    </div>
</div>

<style>
    .main {
        width: 30%;
        padding: 2rem;
        margin: auto;
        margin-top: 6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        border-radius: 0.7rem;
        box-shadow: 0 10px 34px -15px rgb(0 0 0 / 24%);
}



    .icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        margin-bottom: 1rem;
        color: #8d448b;

    }
    .avatar-icon{
        padding: 1.7rem;
        border-radius: 2.5rem;
        width: 5rem;
        height: 5rem;
        margin-bottom: 0.7rem;
        background-color: #8d448b;
        color: white;
    }

    .login {
        width: 100%;
    }

    .signin {
        width: 100%;
        align-self: flex-start;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .btn {
        align-self: flex-start;
        position: absolute;
        margin-top: 22.7rem;
        width: 8rem;
    }

    

    .text {
        font-size: 1.2rem;
        font-weight: 800;
    }

    .text1 {
        color: #8d448b;
        font-weight: 600;
    }
</style>