import { useContext, useEffect, useState } from "react"

import { AuthContext } from "../pages/_app"

import Input from "../utilities/Input"
import Button from "../utilities/Button"

const Authentication = () => {

    const { auth, setAuth } = useContext(AuthContext)
    const [ role, setRole ] = useState("")
    const [ submit, setSubmit ] = useState(false)

    useEffect(() => {

        if(submit) {

            if(!auth.status)
                setAuth({
                    status: true,
                    primaryRole: role,
                    roles: role != "student" ? ["admin", "hod", "pc", "ttc", "fa", "ci"] : []
                })

            setSubmit(false)
        }

    }, [ submit ])

    return (
        <div className="m-10 flex space-x-10">
            <Input name="Role" type="text" value={role} update={(val) => setRole(val)}/>
            <Button name="Submit" color="blue" event={() => setSubmit(true)}/>
        </div>
    )
}

export default Authentication