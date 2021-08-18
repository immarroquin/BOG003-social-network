import { login } from "./view/login.js";
import {register} from './view/register.js';
import { home } from './view/home.js';

export const changeRoute = (hash) =>{
    if(hash === '#/'){
        return showTemplate(hash);
    
    }else if(hash === '#/register'){
        return showTemplate(hash);
    }else{
        return showTemplate(hash);
    }
}

const showTemplate = (hash) =>{
    const containerRoot = document.getElementById('container');
    containerRoot.innerHTML= login() ;

    switch (hash){
        case '#/':
            containerRoot.appendChild(home());
            break;
            
    }
}

