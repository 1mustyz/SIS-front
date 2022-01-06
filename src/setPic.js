import {user} from "./stores"

    // if(user != null){

       export const image = 'https://smart-identificatio.herokuapp.com/' + user.newUser.image.split('/').splice(1).join('/')
    // }