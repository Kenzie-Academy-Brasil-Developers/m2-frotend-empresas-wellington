import { loginUser } from "./request.js"

function eventLogin (){
    const form = document.querySelector('#login')
    const elements = [...form.elements]

    form.addEventListener('submit', async(evt)=>{
        evt.preventDefault()

        const body = {}

        elements.forEach((elem)=>{
            if(elem.value!== ""){
                body[elem.name] = elem.value
            }
        })

        
        await loginUser(body)
    })

}

eventLogin()

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