import { openModalDelete, openModalForm, openModalManege } from "./modal.js";
import { updateCompForm, deleteDepForm, deleteUserForm, updateUserForm, magangerDepForm, renderEmployee } from "./forms.js";
import { dismissEmployee } from "./request.js";

const cardDepart=(depart)=>{
    const localReder = document.querySelector('#dep')

    const tagLi     = document.createElement('li');
    tagLi.classList = "card";

    const tagHeader     = document.createElement('div');
    tagHeader.classList = "card-desc";

    const tagName = document.createElement('p');
    tagName.classList = "title2";
    tagName.innerText = depart.name;

    const tagDescription = document.createElement('p');
    tagDescription.classList = "text-desc"
    tagDescription.innerText = depart.description

    const tagCompany = document.createElement('p')
    tagCompany.classList = "text-desc"
    tagCompany.innerText = depart.companies.name

    const tagActions = document.createElement('div')
    tagActions.classList = "card-actions";

    const tagBtn1 = document.createElement('button')
    tagBtn1.classList = 'btn-act'
    tagBtn1.innerHTML = `<img src="../../img/eyed.png" alt="">`;

    tagBtn1.addEventListener('click',async ()=>{
        const formdepart = await magangerDepForm(depart)
        openModalManege(formdepart)
    })

    const tagBtn2 = document.createElement('button')
    tagBtn2.classList = 'btn-act'
    tagBtn2.innerHTML = `<img src="../../img/edit-blac.png" alt="">`;

    tagBtn2.addEventListener("click",async (event)=>{
        const formEdit =await updateCompForm(depart)
        openModalForm(formEdit)
    })

    const tagBtn3 = document.createElement('button')
    tagBtn3.classList = 'btn-act'
    tagBtn3.innerHTML = `<img src="../../img/trashbox.png" alt="">`;

    tagBtn3.addEventListener('click', async (evt)=>{
        const forDel =await deleteDepForm(depart)
        openModalDelete(forDel)
    })

    tagHeader.append(tagName, tagDescription, tagCompany)

    tagActions.append(tagBtn1, tagBtn2, tagBtn3)

    tagLi.append(tagHeader, tagActions)

    localReder.appendChild(tagLi)
}

const cardUsers=(user)=>{
    const localReder = document.querySelector('#list-users')

    const tagLi     = document.createElement('li');
    tagLi.classList = "card";

    const tagHeader     = document.createElement('div');
    tagHeader.classList = "card-desc";

    const tagName = document.createElement('p');
    tagName.classList = "title2";
    tagName.innerText = user.username;

    const tagDescription = document.createElement('p');
    tagDescription.classList = "text-desc"
    tagDescription.innerText = user.professional_level

    const tagCompany = document.createElement('p')
    tagCompany.classList = "text-desc"
    if(user.kind_of_work !== null){
        tagCompany.innerText = user.kind_of_work
    } else {
    tagCompany.innerText = ""
    }
    const tagActions = document.createElement('div')
    tagActions.classList = "card-actions";

    
    const tagBtn2 = document.createElement('button')
    tagBtn2.classList = 'btn-act'
    tagBtn2.innerHTML = `<img src="../../img/edit-blac.png" alt="">`;

    tagBtn2.addEventListener("click",async (event)=>{
        const formEdit =await updateUserForm(user)
        openModalForm(formEdit)
    })

    const tagBtn3 = document.createElement('button')
    tagBtn3.classList = 'btn-act'
    tagBtn3.innerHTML = `<img src="../../img/trashbox.png" alt="">`;

    tagBtn3.addEventListener('click', async (evt)=>{
        const forDel =await deleteUserForm(user)
        openModalDelete(forDel)
    })

    tagHeader.append(tagName, tagDescription, tagCompany)

    tagActions.append(tagBtn2, tagBtn3)

    tagLi.append(tagHeader, tagActions)

    localReder.appendChild(tagLi)
}

const cardEmployee =(user, depart)=>{
    const localReder = document.querySelector('#list-modal')

    const tagLi     = document.createElement('li');
    tagLi.classList = "cardng";

    const tagHeader     = document.createElement('div');
    tagHeader.classList = "card-desc";

    const tagName = document.createElement('p');
    tagName.classList = "title2";
    tagName.innerText = user.username;

    const tagDescription = document.createElement('p');
    tagDescription.classList = "text-desc"
    tagDescription.innerText = user.professional_level

    const tagCompany = document.createElement('p')
    tagCompany.classList = "text-desc"
    if(user.kind_of_work !== null){
        tagCompany.innerText = user.kind_of_work
    } else {
    tagCompany.innerText = ""
    }
    const tagActions = document.createElement('div')
    tagActions.classList = "card-actions";

    const tagBtn = document.createElement('button')
    tagBtn.classList = 'btn-dem'
    tagBtn.innerText = "Desligar";

    tagBtn.addEventListener('click', async (evt)=>{
        evt.preventDefault()
        
        await dismissEmployee(user.uuid)
        await renderEmployee(depart)
    })


    tagHeader.append(tagName, tagDescription, tagCompany)

    tagActions.append(tagBtn)

    tagLi.append(tagHeader, tagActions)

    localReder.appendChild(tagLi)
} 

const cardAlert=(mensage)=>{
    const localReder = document.querySelector('#list-modal')
    localReder.innerHTML = ""
    const tagLi     = document.createElement('li');
    tagLi.classList = "card";

    const tagtext = document.createElement('h1')
    tagtext.classList = 'title1'
    tagtext.innerText = mensage

    tagLi.appendChild(tagtext)

    localReder.appendChild(tagLi)
}

const cardAlertSector=(mensage)=>{
    const localReder = document.querySelector('#dep')
    localReder.innerHTML = ""
    const tagLi     = document.createElement('li');
    tagLi.classList = "card";

    const tagtext = document.createElement('h1')
    tagtext.classList = 'title1'
    tagtext.innerText = mensage

    tagLi.appendChild(tagtext)

    localReder.appendChild(tagLi)
}




export {
    cardDepart,
    cardUsers,
    cardEmployee,
    cardAlert,
    cardAlertSector
}