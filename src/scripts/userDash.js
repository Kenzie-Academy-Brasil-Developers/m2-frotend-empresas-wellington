function checkPermision(){
    const token = JSON.parse(localStorage.getItem('@kenzie-Empresas:user'))
    if(token == null){
        window.location.replace("../login/index.html")
    }
}

checkPermision()