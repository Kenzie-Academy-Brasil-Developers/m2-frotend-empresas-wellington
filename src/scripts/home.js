import { getAllCompanies, getAllSectors } from "./request.js";

async function renderSectors (){
    const localRender = document.querySelector("#sector")

    const sectors = await getAllSectors()

    sectors.forEach(element => {
    localRender.insertAdjacentHTML("beforeend",
    `
    <option class="input-option" value="${element.description}" id="${element.uuid}">${element.description}</option>
    `


    )        
    });
}

renderSectors()

async function renderCompanies (){
    const localRender = document.querySelector('#companies')

    const companies = await getAllCompanies()


    companies.forEach(element=>{
        localRender.insertAdjacentHTML("beforeend",
        `
        <li class="comp-card">
            <p class="comp-name">${element.name}</p>
            <div class="comp-desc">
                <p class="comp-hour">${element.opening_hours}</p>
                <p class="comp-setor">${element.sectors.description}</p>
            </div>                        
        </li>
        `)
    })

    
}   

const filterCompanies =async () =>{
    const localfilters = document.querySelectorAll(".input-option")
    const localRender  = document.querySelector('#companies')

    console.log(localfilters)

    localfilters.forEach(item=>{
        item.addEventListener('click', async ()=>{
            localRender.innerHTML = "";

            const sector = item.innerText

            console.log(sector)

            if(sector ==="Selecionar Setor"){
                renderCompanies()
            } 

            const companiesFitred = await filterComp(sector)

            companiesFitred.forEach(element=>{
                localRender.insertAdjacentHTML("beforeend",
                `
                <li class="comp-card">
                    <p class="comp-name">${element.name}</p>
                    <div class="comp-desc">
                        <p class="comp-hour">${element.opening_hours}</p>
                        <p class="comp-setor">${element.sectors.description}</p>
                    </div>                        
                </li>
                `)
            })
        })
    })
    

}

async function filterComp(sct){
    const companies = await getAllCompanies()
    const compFilt = companies.filter(element=>{
        return element.sector.description.includes(sct)
    })
    return compFilt
}

renderCompanies()

filterCompanies()



