import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ButtonActivated } from "./ButtonActivated";
import { toast } from "react-toastify";

type User = {
    fullName: string,
    dateNasc: string,
    cpf: string,
    email: string,
    password: string,
    acceptTerms: boolean
  
  }
export const Term = ({ isVisible }: { isVisible: User }) => {
    const [getAccept, setAccept] = useState(false);
  
    const habilitedInput = (e:boolean) => {
      if (e == false) {
        setAccept(false)
      } else {
        setAccept(true)
      }
    }
  
    if (isVisible.fullName != '' && isVisible.dateNasc != '' && isVisible.cpf != '' && isVisible.email != '' && isVisible.password != '') {
      
      if(isVisible.fullName.length >= 5 && isVisible.password.length >= 8 && isVisible.cpf.length == 14 && isVisible.email.length >= 5     ){
        return (
          <div className='buttonOrganization'>
            <FormControlLabel control={<Checkbox onChange={(e) => habilitedInput(e.target.checked)} name="accept_terms" />}
              label="Eu li e concordo com os termos de uso" />
            <ButtonActivated isHabilited={getAccept} data={isVisible}/>
          </div>
    
        );
      }else{

        return (
          <>
     
          <Box
            display={"flex"}
            flexDirection={"column"}
          >
            <label className="label-min" >Preencha o campo antes de continuar</label>
            <ButtonActivated isHabilited={false} data={isVisible} />
          </Box>  
          </>
    
        )
      }
   
  
    } else {
      return (
        <>
        <Box
          display={"flex"}
          flexDirection={"column"}
        >
          <label className="label-min" >Preencha o campo antes de continuar</label>
          <ButtonActivated isHabilited={false} data={isVisible} />
        </Box>  
        </>
  
      )
    }
  }