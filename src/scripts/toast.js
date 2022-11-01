async function toastAlert(status, message){
    const body = document.querySelector("body")
    
    const container = document.createElement('div')
    container.classList.add('alert-toast')
    
    
    if(status == "sucess!"){
        container.classList.add('oktoast')
    }else{
        container.classList.add('notOk')
    }
    
    const alertmessage = document.createElement('p')
    alertmessage.classList.add('textmensage')
    alertmessage.innerText = message

    

    container.append( alertmessage)

    body.appendChild(container);
}

export default toastAlert