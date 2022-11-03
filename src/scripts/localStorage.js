export function getUserLoged(){
    const token = JSON.parse(localStorage.getItem('@kenzie-Empresas:user')) || ""
    return token
}

export default getUserLoged