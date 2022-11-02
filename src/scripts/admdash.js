function validAdminUser(){
    const admtoken = JSON.parse(localStorage.getItem('tokenAdmin'))
    const token    = JSON.parse(localStorage.getItem("@kenzie-Empresas:user"))
    if(token == null){
        window.location.replace("../login/index.html")
    } else if(admtoken == null && token !== null){
       window.location.replace("../userDash/index.html") 
    }
}

validAdminUser()