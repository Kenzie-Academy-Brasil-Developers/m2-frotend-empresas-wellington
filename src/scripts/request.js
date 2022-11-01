
import toastAlert from "./toast.js"

const baseurl = 'http://localhost:6278/'

async function getAllSectors (){
    try {
      const request = await fetch(`${baseurl}sectors`,{
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        }
      })

      
      
      const response =await request.json()
      
      localStorage.setItem('@kenzie-empresas:sectors', JSON.stringify(response))

      return response
    } catch (error) {
        console.log(error)
    }
}

async function getAllCompanies (){
    try {
      const request = await fetch(`${baseurl}companies`,{
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: "bearer null"
        }
      })
      
      const response = await request.json()

      return response

    } catch (error) {
        console.log(error)        
    }
}

async function getNewUser(body){
    try {
        const request = await fetch(`${baseurl}auth/register`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body) 
        })

        
        if(request.ok){
            toastAlert('sucess!', "Usuario cadastrado com sucesso")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }

    } catch (error) {
        console.log(error)
        toastAlert('erro', "Algo errado! Tente novamete")
    }
}

async function loginUser(body){
    try {
        const request = await fetch(`${baseurl}auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)

        } )

        if(request.ok){
            const response = await request.json()

            toastAlert('sucess!', "Usuario logado! Voce será Redirecionado")

            localStorage.setItem("@kenzie-Empresas:user", JSON.stringify(response))
            
            setTimeout(()=>{validateUser(response.token)}, 5000)
            
        } else{
            toastAlert('error', "e-mail ou senha errados")
        }
    } catch (error) {
        console.log(error)
    }
}

async function validateUser(token){
    try {
        const request = await fetch(`${baseurl}auth/validate_user`, {
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        
        const response =await request.json()
        if(response.is_admin){
            window.location.replace("../admDash/index.html")
        } else {
            window.location.replace("../userDash/index.html")
        }

        

    } catch (error) {
        console.log(error)
    }
}
export {
    getAllSectors,
    getAllCompanies,
    getNewUser,
    loginUser
}