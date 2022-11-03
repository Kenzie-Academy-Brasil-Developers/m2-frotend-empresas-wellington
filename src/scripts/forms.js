import { renderDepartments, renderUsers } from "./admdash.js"
import { createDept, getAllCompanies, updateDepart, deleteDepart, deleteUser, updateUser } from "./request.js"

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
    tagBut.innerText = "Atualizar"

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
    btnConfirm.innerText = "Deletar"

    btnConfirm.addEventListener('click',async (evnt)=>{
        evnt.preventDefault()

        await deleteDepart(depart.uuid)
        await renderUsers()
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

        await deleteUser(user.uuid)
        await renderUsers()
    })

    tagDiv.append(title, btnConfirm)

    return tagDiv
}

const updateUserForm = async (user) => {
    const form = document.createElement('form');
    form.id = "edit";

    const tagTilte = document.createElement('h2');
    tagTilte.classList = 'title1';
    tagTilte.innerText = 'Editar Usuário';

    const tagKind = document.createElement("select");
    tagKind.classList = 'input-form';
    tagKind.name = "kind_of_work";

    const tagOptK = document.createElement('option');
    tagOptK.value = "";
    tagOptK.innerText = "Selecionar modalidade de trabalho";

    const tagOptK1 = document.createElement('option');
    tagOptK1.value = "presencial";
    tagOptK1.innerText = "Presencial";

    const tagOptK2 = document.createElement('option');
    tagOptK2.value = "hibrido";
    tagOptK2.innerText = "Hibrido";

    const tagOptK3 = document.createElement('option');
    tagOptK3.value = "home office";
    tagOptK3.innerText = "Home Office";

    tagKind.append(tagOptK, tagOptK1, tagOptK2, tagOptK3)
    
    const tagSelect = document.createElement("select")
    tagSelect.classList = 'input-form'
    tagSelect.name = "professional_level"

    const tagOptPl = document.createElement('option');
    tagOptPl.value = "";
    tagOptPl.innerText = "Selecionar nível profissional";

    const tagOptPl1 = document.createElement('option');
    tagOptPl1.value = "estágio";
    tagOptPl1.innerText = "Estágio";

    const tagOptPl2 = document.createElement('option');
    tagOptPl2.value = "júnior";
    tagOptPl2.innerText = "Júnior";
    
    const tagOptPl3 = document.createElement('option');
    tagOptPl3.value = "sênior";
    tagOptPl3.innerText = "Sênior";
    
    const tagOptPl4 = document.createElement('option');
    tagOptPl4.value = "pleno";
    tagOptPl4.innerText = "Pleno";

    tagSelect.append(tagOptPl, tagOptPl1, tagOptPl2, tagOptPl3, tagOptPl4)

    const tagBut = document.createElement('button')
    tagBut.classList = 'btn-form'
    tagBut.type = 'submit'
    tagBut.innerText = "Atualizar"

    form.append(tagTilte, tagKind, tagSelect, tagBut)

    form.addEventListener('submit', async (evt)=>{
        evt.preventDefault()

        const inputs = [...evt.target]

        const newOpt = {}

        inputs.forEach(({name, value})=>{
            if(name){
                newOpt[name] = value
            }
        })

        
        await updateUser(newOpt, user.uuid)
        await renderUsers()
        
    })

    return form

}
export {
    createNewdepart,
    updateCompForm,
    deleteDepForm,
    deleteUserForm,
    updateUserForm    
}