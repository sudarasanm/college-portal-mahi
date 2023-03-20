import { createContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

import "../styles/index.css"
import "@fontsource/montserrat"

import Layout from "../layouts/Layout"
import Canvas from "../layouts/Canvas"
import Authentication from "../auth"

export const AuthContext = createContext(null);
export const AppContext = createContext(null);

const App = ({ Component, pageProps }) => {
    
    const router = useRouter()

    let role = router.pathname.split("/")[1]

    const [ preload, setPreload ] = useState(false)

    const [ auth, setAuth ] = useState({ status: false })

    const [ data, setData ] = useState(null)

    const Auth = useMemo(() => ({ auth, setAuth }), [auth, setAuth])

    const Data = useMemo(() => ({ data, setData }), [data, setData])

    useEffect(() => {

        if(auth.status) {

            // Get Global Content and Provide Canvas Loading

            const validRoute = role == "" || (role == "student" && auth.primaryRole == "student") || auth.roles.some((ele) => ele == role);

            if(!validRoute) router.push("/");

        }   else router.replace("/");

    }, [auth]);

    return (
        <AuthContext.Provider value={Auth}>
            { 
                auth.status ?
                preload ? <Canvas /> :
                <AppContext.Provider value={Data}>
                    <Layout profile={router.pathname.endsWith("/profile")}>
                        <Component {...pageProps} />
                    </Layout>
                </AppContext.Provider>
                : <Authentication /> 
            }
        </AuthContext.Provider>
    )
}

export default App