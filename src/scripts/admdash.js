import { cardDepart, cardUsers } from "./cards.js"
import { createNewdepart } from "./forms.js"
import { getAllCompanies, getAllDepartamens, getAllUsers } from "./request.js"
import {openModalForm} from "./modal.js"

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

async function renderCompInSelect(){
    const localReder = document.querySelector("#compt")

    const companies = await getAllCompanies()

    companies.forEach((comp)=>{
        localReder.insertAdjacentHTML("beforeend",
        `
        <option value="${comp.uuid}">${comp.name}</option>
        `)
    })

}

renderCompInSelect()

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

async function openNewDept(){
    const openbtn = document.querySelector(".new-depart")

    openbtn.addEventListener('click',async (e)=>{
        e.preventDefault()
        const newdptForm =await createNewdepart()
        openModalForm(newdptForm)
    })
}

openNewDept()

export {
    renderDepartments
}