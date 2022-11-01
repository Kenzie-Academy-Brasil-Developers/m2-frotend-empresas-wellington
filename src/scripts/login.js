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

        console.log(body)
        await loginUser(body)
    })

}

eventLogin()