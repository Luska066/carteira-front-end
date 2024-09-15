import {
    Box,
    Button,
    Card,
    Container, MenuItem, Select,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import React from 'react';
import {Logo} from "../../components/logo"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import configReducer from "../../redux/configuration/reducer";
import {Helpers} from "../../components/Helpers";
import Api from "../../components/Api";


export const CreateStudentIdPage = (): JSX.Element => {
    const auth = useContext(AuthContext)
    const location = useLocation();
    const user = location.state;
    const [curso, setCurso] = useState<[]>([]);
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFinal, setDataFinal] = useState<string>('');
    const steps = [
        {
            name: "Conferir dados",
            path: "#",
        },
        {
            name: "Enviar foto",
            path: "/student-id/create/upload-photo",
        },
        {
            name: "Pagamento",
            path: "/student-id/create/checkout",
        },
    ];
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    // const {user} = useSelector(rootReducer => rootReducer.configReducer);
    useEffect(() => {
        console.log(user)
    }, []);
    const handleCourse = (event) => {
        const value = event.target.value;
        setDataInicio(value.DataInicioCurso)
        setDataFinal(value.DataFimCurso)
        setCurso(value);
    }

    const handleNext = async () => {
        console.log(curso)
        Api.post('api/public/create-student', {
            "NomeCurso": curso?.NomeCurso,
            "DataInicioCurso": curso?.DataInicioCurso,
            "DataFimCurso": curso.DataFimCurso,
            "Matricula": user.Matricula,
            "DataNascimento": user.DataNascimento,
            "NomeAluno": user.NomeAluno,
            "email": user.email,
            "password": user.password
        }).then(response => {
            console.log(response)
            if(response?.success === true && response.message === "Conta criada com sucesso!"){
                auth.notify('success', response.message)
                setTimeout(() => {
                    navigate('/',{state:user.email})
                },3000)
            }
            if(response?.success === false && response.message === "Usuário já cadastrado no sistema"){
                auth.notify('error', response.message)
                setTimeout(() => {
                    navigate(response.redirect_url,{state:user.email})
                },3000)
            }
        }).catch((error) => {
            auth.notify('error', error.message)
        })
    };

    const handleBack = () => {
        navigate("/");
    }
    return (
        <Container maxWidth="md">
            <ToastContainer/>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                flexDirection="column"
            >
                <Typography
                    fontSize="2rem"
                    fontWeight="bold"
                    letterSpacing="3px"
                    mb="1rem"
                    alignSelf="start"
                >
                    <center>
                        <Logo/>
                    </center>
                </Typography>
                <Card sx={{width: "100%"}}>
                    <Box p="4rem">
                        <Stepper activeStep={activeStep}>
                            {steps.map((step, index) => {
                                return (
                                    <Step key={String(index + 1)}>
                                        <StepLabel>{step.name}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <Box>
                            <Box my="1rem">
                                <Typography variant="h6" fontWeight="bold">
                                    Antes de continuar, confira seus dados
                                </Typography>
                                <Stack direction="row" justifyContent="space-between">
                                    <Stack
                                        direction="column"
                                        spacing="1rem"
                                        mt="1rem"
                                        width="50%"
                                    >
                                        <Typography variant="body1" color="text.secondary">
                                            Dados pessoais
                                        </Typography>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Nome
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {user.NomeAluno || "Sem Nome"}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                CPF
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {Helpers.formatarCPF(user.Matricula) || "Sem CPF"}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Data de nascimento
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {Helpers.formateDate(user.DataNascimento) || "Sem Data de Nascimento"}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        direction="column"
                                        spacing="1rem"
                                        mt="1rem"
                                        width="50%"
                                    >
                                        <Typography variant="body1" color="text.secondary">
                                            Dados do curso
                                        </Typography>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Matricula
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {Helpers.formatarCPF(user.Matricula) || "Sem Matrícula"}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Curso
                                            </Typography>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={curso}
                                                label="Age"
                                                onChange={(event) => handleCourse(event)}
                                            >
                                                {user.Cursos && user.Cursos.map((value) => (
                                                    <MenuItem value={value}>{value.NomeCurso}</MenuItem>
                                                ))}
                                            </Select>
                                        </Stack>
                                        <Box display={"flex"} gap={"40px"}>

                                            <Stack>
                                                <Typography variant="body1" color="text.secondary">
                                                    Data Início
                                                </Typography>
                                                <Typography variant="body1" fontWeight="medium">
                                                    {dataInicio || ""}
                                                </Typography>
                                            </Stack>

                                            <Stack>
                                                <Typography variant="body1" color="text.secondary">
                                                    Data Final
                                                </Typography>
                                                <Typography variant="body1" fontWeight="medium">
                                                    {dataFinal || ""}
                                                </Typography>
                                            </Stack>
                                        </Box>

                                    </Stack>
                                </Stack>
                            </Box>

                            <Stack spacing="1rem" direction="row" mt="3rem">
                                <Button
                                    color="warning"
                                    onClick={handleBack}
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    Meus dados estão incorretos
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    size="large"
                                    disabled={dataInicio === ""}
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    Sim meus dados estão corretos, continuar
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};
