import { getCompanyByUser, getCoworkerByuser, getUserInfo, updateUserProfile } from "./request.js"


function checkPermision(){
    const token = JSON.parse(localStorage.getItem('@kenzie-Empresas:user'))
    if(token == null){
        window.location.replace("../login/index.html")
    }
}

checkPermision()

function logout(){
    const butLogout = document.getElementById('logout')

    butLogout.addEventListener('click', (evt)=>{
        evt.preventDefault()

        localStorage.removeItem('@kenzie-Empresas:user')

        window.location.replace('../home/index.html')
    })

}

logout()

async function renderUser(){
    const localReder       = document.querySelector('#head')

    const user = await getUserInfo()
    

    const tagmain     = document.createElement('div')
    tagmain.classList = 'header container'

    const tagUserid     = document.createElement('div');
    tagUserid.classList = 'user-id'
    
    const tagName     = document.createElement('p')
    tagName.classList = 'name'
    tagName.innerText = user.username

    const tagDesc     = document.createElement('div')
    tagDesc.classList = 'user-desc'

    const tagEmail     = document.createElement('p')
    tagEmail.innerText = `Email: ${user.email}`
    
    const tagProf = document.createElement('p')
    if(user.professional_level == null){
        tagProf.innerText = ""
    } else {
        tagProf.innerText = user.professional_level
    }

    const tagKind = document.createElement('p')
    if(user.kind_of_work==null){
        tagKind.innerText = ""
    } else {
        tagKind.innerText = user.kind_of_work
    }

    const tagbtm     = document.createElement('button')
    tagbtm.id        = 'edit'
    tagbtm.innerHTML = `<img class="img-icon" src="../../img/edit-blue.png" alt="">`

    tagbtm.addEventListener('click', async (evt)=>{
        evt.preventDefault()
        await openModalEdit()
    })

    tagDesc.append(tagEmail, tagProf, tagKind)

    tagUserid.append(tagName, tagDesc)

    tagmain.append(tagUserid, tagbtm)

    localReder.appendChild(tagmain)

}

async function renderCompany(){
    const user = await getUserInfo()
    const localRederDepart = document.querySelector('#cpn')
    const listCoworkes     = document.querySelector('#fr-list')

    if(user.department_uuid == null){
        const main = document.querySelector('main')
        main.insertAdjacentHTML("beforeend",
            `
            <div class="notContrated container">
                <h1 class="alert">Você ainda não foi contratado</h1>                         
            </div>
            `
        )
    } else if(user.department_uuid !== null) {
      const containerMain = document.getElementById('contrated')
      const company =  await getCompanyByUser()
      const coworkers = await getCoworkerByuser()
      if(containerMain.classList.contains('invisible')){
        containerMain.classList.remove('invisible')
      }
      
      localRederDepart.insertAdjacentHTML(
        'beforeend',
        `
        <p class="text-header">${company.name}</p>
        <p class="text-header">-</p>
        <p class="text-header">${coworkers[0].name}</p>
        `
      )

      if(coworkers[0].users.length <=1){
        listCoworkes.insertAdjacentHTML('beforeend',
        `
        <li class="card-freind">
            <p class="fr-name">Não há parceiros</p>
        </li>
        
        `)
      } else {
        coworkers[0].users.forEach(element => {
            if(element.uuid !== user.uuid){
            cardFriend(element)}
      });
      }

    }
}

function cardFriend (element){
    const localReder = document.querySelector('#fr-list')

    const tagli     = document.createElement('li')
    tagli.classList = 'card-freind'

    const tagName     = document.createElement('p')
    tagName.classList = 'fr-name'
    tagName.innerText = element.username

    const tagProf     = document.createElement('p')
    tagProf.innerText = element.professional_level

    tagli.append(tagName, tagProf)
    
    localReder.appendChild(tagli)
}

async function openModalEdit(){
    const body = document.querySelector('body')

    const backgroundModal     = document.createElement("section")
    backgroundModal.classList = "background"
    
    
    const container     = document.createElement("section")
    container.classList = "modalCont" 
    
    
    const modalBtn     = document.createElement("button")
    modalBtn.classList = "modalClose"
    modalBtn.innerText = "X"

    backgroundModal.addEventListener('click', (e)=>{
        const {className} = e.target
        if(className === "background" || className === "modalClose"){
            backgroundModal.remove()
        }
    })

    const formEdit = document.createElement('form')

    const formTitle     = document.createElement('p')
    formTitle.classList = 'title1'
    formTitle.innerText = 'Editar Perfil'

    const formIn1       = document.createElement('input')
    formIn1.classList   = 'input-form'
    formIn1.type        = 'text'
    formIn1.name        = 'username'
    formIn1.placeholder = 'Seu nome'
    formIn1.required    = true

    const formIn2       = document.createElement('input')
    formIn2.classList   = 'input-form'
    formIn2.type        = 'email'
    formIn2.name        = 'email'
    formIn2.placeholder = 'Seu e-mail'
    formIn2.required    = true

    const formIn3       = document.createElement('input')
    formIn3.classList   = 'input-form'
    formIn3.type        = 'password'
    formIn3.name        = 'password'
    formIn3.placeholder = 'Sua senha'
    formIn3.required    = true

    const formBtn     = document.createElement('button')
    formBtn.classList = 'btn-form'
    formBtn.innerText = 'Editar perfil'

    formEdit.append(formTitle, formIn1, formIn2, formIn3,formBtn)

    formEdit.addEventListener('submit', async (evt)=>{
        evt.preventDefault()
        const header = document.querySelector('#head')
        const main = document.querySelector('main')

        const inputs = [...evt.target]

        const editUser = {}

        inputs.forEach(({name, value})=>{
            if(name){
                editUser[name] = value
            }
        })
        
        await updateUserProfile(editUser)
        header.innerHTML = ""
        await renderUser()
        evt.path[2].remove()
        
    })

    container.appendChild(modalBtn)
    container.append(formEdit)
    backgroundModal.appendChild(container)
    body.appendChild(backgroundModal)
}

renderUser()
renderCompany()