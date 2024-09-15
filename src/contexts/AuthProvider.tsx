import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext"
import { useApi } from "../hooks/useApi";
import bcrypt from 'bcryptjs';
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-toastify/dist/ReactToastify.css';


type User = {
    id:number,
    name: string 
    email:string,
    dataNasc: string,
    matricula:string,
    data_inicio:string,
    data_final:string,
    token:string
}

type UserTwo = {
    id:number,
    uuid:string,
    name: string ,
    curso:string,
    cpf:string,
    email:string,
    dataNasc: string,
    matricula:string,
    image_path:string,
    dt_nasc:string,
    dt_inicio:string,
    dt_final:string,
    updated_at:string,
    created_at:string,
}

export const AuthProvider = ({children}:{children:JSX.Element}) => {
    const [user,setUser] = useState<User | UserTwo | null>(null);
    const [users,setUserProfile] = useState(null);
    const [paymentId,setPayment] = useState<any>();
    const [image,setImage] = useState<File>();
    const api = useApi()
    

    const signin = async (name:string,email:string,dtNasc:string,password:string,cpf:string) => {
        
	 try{
		const data:any = await api.signin(name,email,dtNasc,password,cpf)
		clearStorage('msg');
		let thisCpf =  cpf.replace(".", "").replace(".", "").replace("-", "")
 
	        if(data.Matricula == thisCpf && data.DataNascimento == dtNasc && data.NomeAluno == name){
	            if(data != '' ){
	                setUser(data)
	                setToken(bcrypt.genSaltSync(40))
	                return true
	            }
	        }else{
	            setMsg('Ops! Algumas credenciais não conferem,porfavor verifique e tente novamente!')
	            return false
	        }
        }catch(e){
	            setMsg('Ops! Algumas credenciais não conferem,porfavor verifique e tente novamente!')
		    return false
        }        

    }

    type User = {
        name:string,
        email:string,
        password:string,
        matricula:string,
        curso:string,
        cpf:string,
        image_path:string,
        dt_nasc:string,
        dt_inicio:string,
        dt_final:string,
    }
    const createUser = async (user:User) => {
        const data = await api.create(user)

        if(data != ''){
            return data
        }else{
            return ''
        }   
    }

   
    const validateTokens = async (token:any) => {
        try{
        setToken(token.data)
        const data = await api.validateToken(token.data)
            if(data !== false ){                
                const usuario = await api.getUserByToken(token.data);
                    if(usuario != ''){
                        setUserProfile(usuario.data);
                        return usuario.data;
                    }else{
                        return ''
                    }
            }
        }catch(e){
            setMsg('Ops! Algumas credenciais não conferem,porfavor verifique e tente novamente!')
            return false
        }
    }

    const getImageById = async (id:string) => {
        let response = await api.getImageById
    }

    const notify = (type:String,msg:string) => {
        if(type == 'success'){
            toast.success(msg)
        }else if(type == 'error'){
            toast.error(msg)
        }
    };
    
    const signout =  async () => {
        await api.logout()
        setUser(null)
    }

    const setMsg = (msg:string) => {
        localStorage.setItem('msg',msg)
    }

    const getMsg = () => {
        return localStorage.getItem('msg')
    }

    const setToken = (token:string) => {
        localStorage.setItem('authToken',token)
    }
    
    const clearStorage = (storage:string) => {
        localStorage.removeItem(storage)
    }

    const clearUser = () => {
        setUser(null);
    }

    const defineUser = (user:any) => {
     
        setUser(user);
    }

    const setPayments = (idPayment :any) => {
        setPayment(idPayment);
    }

	//@ts-ignore
    return (
	//@ts-ignore	
        <AuthContext.Provider value={{user,signin,signout,notify,clearUser,createUser,validateTokens,getImageById,users,defineUser,setPayments,paymentId}}>
            {children}
        </AuthContext.Provider>
    )
}
