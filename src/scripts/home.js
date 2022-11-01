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

    const filter = filterCompanies()

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

const filterCompanies =() =>{
    const localfilters = document.getElementsByClassName("input-option")
    console.log(localfilters)
    

}


renderCompanies()



