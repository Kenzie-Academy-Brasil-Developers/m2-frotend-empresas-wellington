import toastAlert from "./toast.js"
import getUserLoged from "./localStorage.js"

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
            localStorage.setItem('tokenAdmin', JSON.stringify(response))

            window.location.replace("../admDash/index.html")
        } else {
            window.location.replace("../userDash/index.html")
        }

        

    } catch (error) {
        console.log(error)
    }
}

async function getAllDepartamens(){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}departments`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            }
        })

        const response = await request.json()
        
        return response
    } catch (error) {
        console.log(error)
    }

}

async function getAllUsers(){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}users`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            }
        })

        const response = await request.json()
      
        return response
    } catch (error) {
        console.log(error)
    }
}

async function createDept(body){
    const token = getUserLoged();
    try {
        const request = await fetch(`${baseurl}departments`,{
            method:"POST",
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })
        
        if(request.ok){
            toastAlert('sucess!', "Departamento cadastrado com sucesso")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }
    } catch (error) {
        toastAlert('erro', "Algo errado! Tente novamete")
    }
}

async function updateDepart(body, id){
    const token = getUserLoged();
    try {
        const request = await fetch(`${baseurl}departments/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })
        
        if(request.ok){
            toastAlert('sucess!', "Departamento atualizado com sucesso")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }
    } catch (error) {
        toastAlert('erro', "Algo errado! Tente novamete")
    }
}

async function deleteDepart(id){
    const token = getUserLoged();
    try {
        const request = await fetch(`${baseurl}departments/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
           
        })
        
        if(request.status == 204){
            toastAlert('sucess!', "Departamento excluido com sucesso")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }
    } catch (error) {
        toastAlert('erro', "Algo errado! Tente novamete")
    }
}

async function deleteUser(id){
    const token = getUserLoged();
    try {
        const request = await fetch(`${baseurl}admin/delete_user/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
           
        })
        
        if(request.status == 204){
            toastAlert('sucess!', "Usuário excluido com sucesso")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }
    } catch (error) {
        toastAlert('erro', "Algo errado! Tente novamete")
    } 
}

async function updateUser(body, id){
    const token = getUserLoged();
    try {
        const request = await fetch(`${baseurl}admin/update_user/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })
        
        if(request.ok){
            toastAlert('sucess!', "Usuário atualizado com sucesso")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }
    } catch (error) {
        toastAlert('erro', "Algo errado! Tente novamete")
    }
}

async function getUsersNotWork(){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}admin/out_of_work`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            }
        })

        const response = await request.json()
      
        return response
        
    } catch (error) {
        console.log(error)
    }

}

async function contractEmployee(body){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}departments/hire/`, {
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            toastAlert('sucess!', "Funcionario contratado!")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }        
    } catch (error) {
        console.log(error)
    }

}

async function dismissEmployee(id){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}departments/dismiss/${id}`, {
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
        })
        if(request.ok){
            toastAlert('sucess!', "Funcionario Demitido")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }        
    } catch (error) {
        console.log(error)
    }
}

async function getCompaniesBySector(sector){
    try {
        const request = await fetch(`${baseurl}companies/${sector}`, {
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                 Authorization: "bearer null",
            },
        })

        const response =await request.json()

        return response
    } catch (error) {
        console.log(error)
    }
}

async function getDeptByCompany(id){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}departments/${id}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            }
        })

        const response = await request.json()
        
        return response
    } catch (error) {
        console.log(error)
    }

}

async function getUserInfo(){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}users/profile`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token.token}`
            }
        })
        const response =await request.json()
        
        return response

    } catch (error) {
        console.log(error)
    }
}

async function getCompanyByUser(){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}users/departments`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token.token}`
            }
        })
        const response =await request.json()
        
        return response

    } catch (error) {
        console.log(error)
    }
}

async function getCoworkerByuser(){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}users/departments/coworkers`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token.token}`
            }
        })
        const response =await request.json()
        
        return response

    } catch (error) {
        console.log(error)
    }
}

async function updateUserProfile(body){
    const token = getUserLoged()
    try {
        const request = await fetch(`${baseurl}users`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })

        if(request.ok){
            toastAlert('sucess!', "Perfil editado com sucesso")
        } else {
            toastAlert('erro', "Algo errado! Tente novamete")
        }

    } catch (error) {
        console.log(error)
        toastAlert('erro', "Algo errado! Tente novamete")
    }
}

export {
    getAllSectors,
    getAllCompanies,
    getAllDepartamens,
    getDeptByCompany,
    getCompaniesBySector,
    getNewUser,
    loginUser,
    getAllUsers,
    createDept,
    updateDepart,
    deleteDepart,
    deleteUser,
    updateUser,
    getUsersNotWork,
    contractEmployee,
    dismissEmployee,
    getUserInfo,
    getCompanyByUser,
    getCoworkerByuser,
    updateUserProfile
}