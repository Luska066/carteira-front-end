import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {useNavigate} from "react-router-dom";
import {useApi} from "../hooks/useApi";
import axios from "axios";
import Api from "../components/Api";


export const RequireLoggin = ({children}: { children: JSX.Element }) => {
    const [responses, setResponse] = useState()
    const api = axios.create({
        baseURL: process.env.REACT,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': '*/*',
        }
    })

    const auth = useContext(AuthContext)

    useEffect(() => {
        Api.get('api/v1/verify')
    }, []);
    if (localStorage.getItem('access_token') === null) {
        window.location.href= '/'
    } else {
        return children
    }


    //simulando resultado ad Api


}
