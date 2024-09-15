import { createContext } from "react";
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

type Users = {
    NomeAluno:string,
    Email:string,
    Password:string,
    Matricula:string,
    NomeCurso:string,
    cpf:string,
    image_path:string,
    DataNascimento:string,
    DataInicioCurso:string,
    DataFinalCurso:string,
}

type UsersTwo = {
    cpf:string,
    created_at:string,
    curso:string,
    dt_final:string,
    dt_inicio:string,
    dt_nasc:string,
    email:string,
    id:number,
    image_path:string,
    matricula:string,
    name:string,
    updated_at:string,
    uuid:string,
    verified_at:string,

}

export type AuthContextType= {
    user : Users | null ,
    signin : (name:string,email:string,dtNasc:string,password:string,cpf:string) => Promise<boolean | undefined> 
    signout: () => void ,
    validateTokens: (token:string) => boolean,
    getUserByToken:(token:string) => string,
    notify:(type:string,msg:string) => any,
    clearUser:() => void,
    paymentId:string,
    users: UsersTwo,
    createUser:(user:Users) => string,
    getImageById:(id_user:number) => Blob,
    defineUser:(user:any) => void
}

export  const AuthContext = createContext<AuthContextType>(null!);
