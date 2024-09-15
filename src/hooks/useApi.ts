
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT,
//    headers:{
//        'Access-Control-Allow-Origin' : '*',
//        'Content-Type' : 'application/json',
//        'Accept' : '*/*',
//    }
})
const apiFile = axios.create({
    baseURL: process.env.REACT,
    headers:{
        'Content-Type' : 'multipart/form-data',
        'Accept' : '*/*',
//        'Access-Control-Allow-Origin' : '*',
        'ResponseType' : 'blob'
    }
   })


type Inter = {
    id:number,
    name:string, 
    dataNasc:string,
    email: string,
    matricula:string,
    data_inicio:string,
    data_final: string
    token:string,
     
}

export const useApi = () => ({

    validateToken : async( token:string) => {
	//@ts-ignore
        const response = await api.get('/api/validate/',{token}).then(e => Boolean(e))
        // return response.data
        //simulando resultado ad Api
        if(response == true){
            return true
        }else{
            return false
        }
   
    },
    signin: async(name:string,email:string,dtNasc:string,password:string,cpf:string) =>{
       
	//Verifica se o usuário existe na faculdade
 
       let cpfFIltred = cpf
       
        const data =  { 
            name:name ,
            email:email,
            dt_nasc:dtNasc,
            password:password,
            cpf_form:cpfFIltred.replace(".", "").replace(".", "").replace("-", ""),
        };

        const url = `https://admin.uniensinovirtual.com.br/carteirinha?name=${data.name}&document=${data.cpf_form}&birthDate=${data.dt_nasc}&token=1725a451e76cfec7701d43fa5e9fbd2eafa28c3e3a046f9d9d1bd5c61926ffb7`

       
       let response = await api.get(url).then(res => {
            if(res.data === '') {
                return ''
            }
        
            let responseWithPassword = {
                NomeAluno : res.data.data.NomeAluno,
                NomeCurso : res.data.data.NomeCurso,
                Matricula : res.data.data.Matricula,
                DataNascimento : res.data.data.DataNascimento,
                DataInicioCurso : res.data.data.DataInicioCurso,
                DataFimCurso : res.data.data.DataFimCurso,
                Password:password,
                Email: email
            };
       
          
            return responseWithPassword
       })
       return response         
    },
    getUserByToken : async(remember_token:string) => {
        
 
        const response = await api.post(`/api/v2/user/`,{remember_token}).then(e => e);
        //simulando resultado ad Api
        if(response != null){
            return response
        }else{
            return ''
        }
   
    },
    getImageById : async(id_user:number) => {
        
 
        const response = await api.post(`/api/photos/`,{id_user:id_user}).then(e => e);
        console.log(response)
       
   
    },
    logout: async () =>{
        const response = await api.post('/logout')

    },
    create: async (user:User) =>{
        const response = await api.post('/api/create/user',user).then(e => e)
        console.log(response)
        if(response){
            return response
        }else{
            return ''
        }
    }
})

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
