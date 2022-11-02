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

    tagBtn1.addEventListener('click',()=>{
        
    })

    const tagBtn2 = document.createElement('button')
    tagBtn2.classList = 'btn-act'
    tagBtn2.innerHTML = `<img src="../../img/edit-blac.png" alt="">`;

    const tagBtn3 = document.createElement('button')
    tagBtn3.classList = 'btn-act'
    tagBtn3.innerHTML = `<img src="../../img/trashbox.png" alt="">`;

    tagHeader.append(tagName, tagDescription, tagCompany)

    tagActions.append(tagBtn1, tagBtn2, tagBtn3)

    tagLi.append(tagHeader, tagActions)

    localReder.appendChild(tagLi)
}