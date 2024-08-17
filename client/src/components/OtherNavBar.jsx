import { Link, useNavigate } from "react-router-dom"
import { HOME_ICON } from "../assets/icons"
import { useEffect } from "react"

const OtherNavBar = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            const nav = document.getElementById("nav")
            if (window.scrollY > 50) nav.style.backgroundColor = "blue"
           else nav.style.backgroundColor='#313131'
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    return (
        <div id="nav" className="flex justify-center mt-2 border border-transparent border-b-gray-400 p-1 sticky top-0 z-10 ">
            <div className="w-[400px] h-[40px] flex justify-center border border-gray-200">
                <div onClick={() => navigate('/')} className="hover:bg-[#595858] cursor-pointer p-1 flex justify-center items-center w-1/2"><img src={HOME_ICON} alt="loading" className="w-[25px] h-[30px] flex justify-center items-center" /></div>
                <div className="w-1/2 hover:bg-[#595858] p-1 flex justify-center items-center cursor-pointer ">{localStorage.getItem("devil-auth") ?
                    <Link to={"/u/" + JSON.parse(localStorage.getItem("devil-auth")).name}><div className="flex justify-center items-center"><img src={JSON.parse(localStorage.getItem("devil-auth")).photo} alt="loading" className="w-[30px] h-[30px] rounded-full flex justify-center items-center" /></div></Link>
                    :
                    <Link to="/auth/login"><div className="flex justify-center items-center"><button className="w-[200px] h-[30px] rounded-md font-rubik text-white flex justify-center">Login/Signup</button></div></Link>
                }</div>
            </div>
        </div>
    )
}

export default OtherNavBar
