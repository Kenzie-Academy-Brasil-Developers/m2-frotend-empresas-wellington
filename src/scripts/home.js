import { getAllCompanies, getAllSectors, getCompaniesBySector } from "./request.js";

async function renderSectors (){
    const localRender = document.querySelector("#sector")

    const sectors = await getAllSectors()

    sectors.forEach(element => {
    localRender.insertAdjacentHTML("beforeend",
    `
    <option class="input-option" value="${element.description}">${element.description}</option>
    `


    )        
    });
    localRender.addEventListener('click',async (evt)=>{
        evt.preventDefault()

        const sector = localRender.value
        console.log(sector)
        await filterCompanies(sector)
        
    })
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

const filterCompanies =async (sector) =>{
    const localRender  = document.querySelector('#companies')
    localRender.innerHTML = ""
    if(sector ==="Selecionar Setor"){
        
        renderCompanies()
    }
  

    const filter = await getCompaniesBySector(sector)

   
    filter.forEach(element=>{
        
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

async function filterComp(sct){
    const companies = await getAllCompanies()
    const compFilt = companies.filter(element=>{
        return element.sector.description.includes(sct)
    })
    return compFilt
}

renderCompanies()





