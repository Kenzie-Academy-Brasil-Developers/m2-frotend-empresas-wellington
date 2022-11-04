function openModalForm(cildren){
    const body = document.querySelector('body')

    const backgroundModal = document.createElement("section")
    const container = document.createElement("section")
    const modalBtn = document.createElement("button")

    backgroundModal.classList.add("background") 
    container.classList.add("modalCont") 
    modalBtn.classList.add("modalClose")

    modalBtn.innerText = "X"

    backgroundModal.addEventListener('click', (e)=>{
        const {className} = e.target
        if(className === "background" || className === "modalClose"){
            backgroundModal.remove()
        }
    })

    container.appendChild(modalBtn)
    container.append(cildren)
    backgroundModal.appendChild(container)
    body.appendChild(backgroundModal)
}


function openModalDelete(cildren){
    const body = document.querySelector('body')

    const backgroundModal = document.createElement("section")
    const container = document.createElement("section")
    const modalBtn = document.createElement("button")

    backgroundModal.classList.add("background") 
    container.classList.add("modalDelete") 
    modalBtn.classList.add("modalClose")

    modalBtn.innerText = "X"

    backgroundModal.addEventListener('click', (e)=>{
        const {className} = e.target
        if(className === "background" || className === "modalClose"){
            backgroundModal.remove()
        }
    })

    container.appendChild(modalBtn)
    container.append(cildren)
    backgroundModal.appendChild(container)
    body.appendChild(backgroundModal)
}

function openModalManege(cildren){
    const body = document.querySelector('body')

    const backgroundModal = document.createElement("section")
    const container = document.createElement("section")
    const modalBtn = document.createElement("button")

    backgroundModal.classList.add("background") 
    container.classList.add("modalMananger") 
    modalBtn.classList.add("modalClose")

    modalBtn.innerText = "X"

    backgroundModal.addEventListener('click', (e)=>{
        const {className} = e.target
        if(className === "background" || className === "modalClose"){
            backgroundModal.remove()
        }
    })

    container.appendChild(modalBtn)
    container.append(cildren)
    backgroundModal.appendChild(container)
    body.appendChild(backgroundModal)
}

export {openModalForm, openModalDelete, openModalManege}