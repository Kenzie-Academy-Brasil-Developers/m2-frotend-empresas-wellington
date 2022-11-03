import { cardDepart, cardUsers } from "./cards.js"
import { getAllDepartamens, getAllUsers } from "./request.js"


function validAdminUser(){
    const admtoken = JSON.parse(localStorage.getItem('tokenAdmin'))
    const token    = JSON.parse(localStorage.getItem("@kenzie-Empresas:user"))
    if(token == null){
        window.location.replace("../login/index.html")
    } else if(admtoken == null && token !== null){
       window.location.replace("../userDash/index.html") 
    }
}

validAdminUser()

async function renderDepartments(){
    const localReder = document.querySelector('#dep');

    localReder.innerHTML = ""

    const departments = await getAllDepartamens()

    departments.forEach(department => {
        cardDepart(department)
    });
    
}

renderDepartments()

async function renderUsers(){
    const localReder = document.querySelector('#list-users');

    localReder.innerHTML = ""

    const users = await getAllUsers()

    users.forEach(user => {
        if(user.is_admin !== true){
            cardUsers(user)
        }
    });    
}

renderUsers()