import axios from "axios";
const initialState = {
    user:{
        NomeAluno:null,
        cpf:null,
        DataNascimento:null,
        Matricula:null,
        Cursos : [],
    }
}
//@ts-ignore
const configReducer = (state = initialState,action) => {
    if(action.type === "config/load"){
        return {...state,user:action.payload.user}
    }
    return state
}

export default configReducer;