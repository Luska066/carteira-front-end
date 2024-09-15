import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import {Button, Typography} from "@mui/material";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Api from "../components/Api"
import {useDispatch} from "react-redux";

type User = {
    fullName: string,
    dateNasc: string,
    cpf: string,
    email: string,
    password: string,
    acceptTerms: boolean

}

type UserTwo = {
    data: {
        fullName: string,
        dateNasc: string,
        cpf: string,
        email: string,
        password: string,
        acceptTerms: boolean
    }

}

export let ButtonActivated = ({isHabilited, data}: { isHabilited: boolean, data: User }): JSX.Element => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const dispatch = useDispatch();
    const HandleNext = async () => {
        if(data?.fullName != '' && data?.cpf != '' && data?.dateNasc != ''){
          try{
              // navigate('/student-id/create')
              Api.post('api/public/prelogin',{
                  "cpf": data?.cpf,
                  "data_nascimento": data?.dateNasc,
                  "name": data?.fullName
              }).then(response => {
                  console.log(response)

                  if(response?.success === true){
                      auth.notify('success','Estudante encontrado com sucesso!')
                      let object =response.data;
                      object.password = data?.password;
                      object.email =data?.email;
                      navigate('/student-id/create',{state: object})
                  }
              }).catch(error => {
                  auth.notify('errors',error.message || "Erro creating student");
              });

        }catch(e){
          auth.notify('error','Erro Ao Verificar')
        }

        }else{

          auth.notify('error','Erro Verifique os Dados Passados')
        }
    };


    if (isHabilited == true) {
        return (
            <div className='buttonOrganization'>
                <ToastContainer/>
                <Button variant="contained" size="large" onClick={HandleNext}>
                    <Typography fontSize="1rem" fontWeight="bold">
                        Continuar
                    </Typography>
                </Button>
            </div>
        )
    } else {
        return (
            <>
                <Button variant="contained" disabled>
                    <Typography fontSize="1rem" fontWeight="bold">
                        Continuar
                    </Typography>
                </Button>
            </>
        )
    }

}
