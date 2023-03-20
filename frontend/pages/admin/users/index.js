import { useRouter } from "next/router"
import { useEffect } from "react"

const Users = () => {

    const router = useRouter()
    
    useEffect(() => { router.push('/admin/users/students') }, [])

    return  null
}

export default Users