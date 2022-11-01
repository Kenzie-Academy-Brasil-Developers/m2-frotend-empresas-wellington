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

export {
    getAllSectors,
    getAllCompanies
}