import { renderDepartments } from "./admdash.js"
import { createDept, getAllCompanies, updateDepart, deleteDepart } from "./request.js"

const createNewdepart = async () =>{
    const companies = await getAllCompanies()

    const form = document.createElement('form')
    form.id = "creat"

    const tagTilte = document.createElement('h2')
    tagTilte.classList = 'title1';
    tagTilte.innerText = 'Criar Departamento'

    const tagName = document.createElement('input')
    tagName.classList = 'input-form'
    tagName.type = 'text'
    tagName.name = 'name'
    tagName.placeholder = 'Nome do departamento'
    tagName.required = true

    const tagDescription = document.createElement('input')
    tagDescription.classList = 'input-form'
    tagDescription.type = 'text'
    tagDescription.name = 'description'
    tagDescription.placeholder = 'Descrição do departamento'
    tagDescription.required = true

    const tagSelect = document.createElement("select")
    tagSelect.classList = 'input-form'
    tagSelect.name = "company_uuid"

    const tagOption = document.createElement('option')
    tagOption.innerText = "selecionar empresa"

    tagSelect.append(tagOption)

    companies.forEach(comp => {
        
        tagSelect.insertAdjacentHTML("beforeend",
        `
        <option value="${comp.uuid}">${comp.name}</option>
        `)

        
    });
    

    
    const tagBut = document.createElement('button')
    tagBut.classList = 'btn-form'
    tagBut.type = 'submit'
    tagBut.innerText = "Cadastrar"

    form.append(tagTilte, tagName, tagDescription, tagSelect, tagBut)
    
    form.addEventListener('submit', async (evt)=>{
        evt.preventDefault()

        const inputs = [...evt.target]

        const newDept = {}

        inputs.forEach(({name, value})=>{
            if(name){
                newDept[name] = value
            }
        })

        
        await createDept(newDept)
        await renderDepartments()
        
    })
    
    return form

}

const updateCompForm = async (depart) => {
    const form = document.createElement('form')
    form.id = "edit"

    const tagTilte = document.createElement('h2')
    tagTilte.classList = 'title1';
    tagTilte.innerText = 'Editar Descrição'

    const tagDescription = document.createElement('input')
    tagDescription.classList = 'input-desc'
    tagDescription.type = 'text'
    tagDescription.name = 'description'
    tagDescription.placeholder = depart.description
    tagDescription.required = true

    const tagBut = document.createElement('button')
    tagBut.classList = 'btn-form'
    tagBut.type = 'submit'
    tagBut.innerText = "atualizar"

    form.append(tagTilte, tagDescription, tagBut)

    form.addEventListener('submit', async (evt)=>{
        evt.preventDefault()

        const inputs = [...evt.target]

        const newDesc = {}

        inputs.forEach(({name, value})=>{
            if(name){
                newDesc[name] = value
            }
        })

        
        await updateDepart(newDesc, depart.uuid)
        await renderDepartments()
        
    })

    return form

}

const deleteDepForm = async (depart) =>{
    const tagDiv = document.createElement('div')
    tagDiv.classList ='divDelete'

    const title = document.createElement('h2')
    title.classList = "title1"
    title.innerText = `Realmente deseja deletar o Departamento ${depart.name} e demitir seus funcionários?`

    const btnConfirm = document.createElement('button')
    btnConfirm.classList = 'btnDelete'
    btnConfirm.innerText = "Confirmar"

    btnConfirm.addEventListener('click',async (evnt)=>{
        evnt.preventDefault()

        await deleteDepart(depart.uuid)
        await renderDepartments()
    })

    tagDiv.append(title, btnConfirm)

    return tagDiv
}

const deleteUserForm = async (user) =>{
    const tagDiv = document.createElement('div')
    tagDiv.classList ='divDelete'

    const title = document.createElement('h2')
    title.classList = "title1"
    title.innerText = `Realmente deseja remover usuario ${user.username}?`

    const btnConfirm = document.createElement('button')
    btnConfirm.classList = 'btnDelete'
    btnConfirm.innerText = "deletar"

    btnConfirm.addEventListener('click',async (evnt)=>{
        evnt.preventDefault()

        await deleteDepart(user.uuid)
        await renderDepartments()
    })

    tagDiv.append(title, btnConfirm)

    return tagDiv
}
export {
    createNewdepart,
    updateCompForm,
    deleteDepForm
}