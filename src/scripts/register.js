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