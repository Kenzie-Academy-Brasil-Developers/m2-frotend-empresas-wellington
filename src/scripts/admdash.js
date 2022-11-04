import { cardAlert, cardAlertSector, cardDepart, cardUsers } from "./cards.js"
import { createNewdepart } from "./forms.js"
import { getAllCompanies, getAllDepartamens, getAllUsers, getDeptByCompany } from "./request.js"
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

    localReder.addEventListener('click', async (e)=>{
        e.preventDefault()

        const company = localReder.value
        
        if(companies != "Selecionar Empresa"){ 
            await renderDeparbycomp(company)
        }
        
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

async function renderDeparbycomp(id){
    const localReder = document.querySelector('#dep')
    localReder.innerHTML = ""
    const depart = await getDeptByCompany(id)

    if(depart.length===0){
        cardAlertSector("Nenhum departamento alocado")
    }

    depart.forEach(department => {
        cardDepart(department)
    });

}

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

function logoutAdm(){
    const butLogout = document.getElementById('logout')

    butLogout.addEventListener('click', (evt)=>{
        evt.preventDefault()

        localStorage.removeItem('@kenzie-Empresas:user')
        localStorage.removeItem('tokenAdmin')

        window.location.replace('../home/index.html')
    })

}

logoutAdm()

export {
    renderDepartments,
    renderUsers
}