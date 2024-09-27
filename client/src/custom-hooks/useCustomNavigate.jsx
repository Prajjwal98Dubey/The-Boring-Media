import { useNavigate } from "react-router-dom"


export const useCustomNavigate = (url)=>{
    const navigate = useNavigate()
    return navigate(url)
}

