import { login } from "./view/login.js";
import { register } from "./view/register.js";
import { home } from "./view/home.js";
import { profile } from "./view/profile.js";
import { add } from "./view/add.js";

export const showTemplate = (hash) => {
  const containerRoot = document.getElementById("container");
  containerRoot.innerHTML = "";

  switch (hash) {
    case "":
      containerRoot.appendChild(login());
      break;
    case "#/register":
      containerRoot.appendChild(register());
      break;
    case "#/home":
      containerRoot.appendChild(home());
      break;
    case "#/profile":
      containerRoot.appendChild(profile());
      break;
    case "#/add":      
      setTimeout(() => {
        containerRoot.appendChild(add());
        containerRoot.appendChild(home());
      }, 500);
      break;
    default:
      containerRoot.innerHTML = "Ups Error 404";
  }
};
