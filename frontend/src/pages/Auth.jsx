import { useEffect } from "react"
import { LOGO } from "../assets/icons"
const Auth = () => {
    useEffect(() => {
        if (!sessionStorage.getItem("devil-auth-img")) sessionStorage.setItem("devil-auth-img", LOGO);
    }, [])
    return (
        <>
            <div className="w-1/2 h-full font-rubik"><img src={sessionStorage.getItem("devil-auth-img") ? sessionStorage.getItem("devil-auth-img") : LOGO} className="w-full h-full" alt="loading" loading="lazy" /></div>
            {/* <div className="w-1 h-full bg-white"></div> */}
        </>
    )
}

export default Auth
