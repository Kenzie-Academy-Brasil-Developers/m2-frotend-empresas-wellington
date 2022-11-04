import { getNewUser } from "./request.js"

function registerUser(){
    const form = document.querySelector('#register')
    const elements = [...form.elements]

    form.addEventListener("submit",async(event)=>{
        event.preventDefault()

        const body = {}

        elements.forEach((elem)=>{
            if(elem.value !== ""){
                body[elem.name] = elem.value
            }
        })

        await getNewUser(body)
    })

}

registerUser()

function openbuttons(){
    const btnmenu = document.getElementById('menu')
    let menumobile = document.querySelector(".mobile-menu")
    btnmenu.addEventListener('click',(e)=>{
        if(menumobile.classList.contains("open")){
            menumobile.classList.remove('open')
            document.querySelector('.icon').src = "../../img/hamburguer.png"
        }else{
            menumobile.classList.add('open')
            document.querySelector('.icon').src = "../../img/exit.png"
            
        }
    })
    
}

openbuttons()