import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export const RequireAuth = ({children} : {children : JSX.Element}) => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    return children



}