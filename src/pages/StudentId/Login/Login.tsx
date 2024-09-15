import {
    Box,
    Button,
    Card,
    Container, MenuItem, Select,
    Stack,
    Step,
    StepLabel,
    Stepper, TextField,
    Typography,
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import React from 'react';
import {Logo} from "../../../components/logo"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import configReducer from "../../../redux/configuration/reducer";
import {Helpers} from "../../../components/Helpers";
import Api from "../../../components/Api";
import axios from "axios";


export const Login = (): JSX.Element => {
    const auth = useContext(AuthContext)
    const location = useLocation();
    const user = location.state;
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
    const [cpf, setCpf] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    // const {user} = useSelector(rootReducer => rootReducer.configReducer);
    useEffect(() => {
        console.log(user)
    }, []);

    //ts-ignore
    const handleChangeCPF = (event:string) => {
        //@ts-ignore
        setCpf(Helpers.cpfMask(event.target.value))
    }

    const handleNext = async () => {
        Api.post('oauth/token', {
            'grant_type': 'password',
            'client_id': '1',
            //'client_secret': 'j6ZG2pxzNb7BVMJ6bvqf3HIXWGHjkSXylpGL88fC',
            'client_secret': 'MTKkfV2PAPM2HFmlWzeWKUvyRKqndvjSAz9jnCgK',
            'username': 'lucas.santsena@gmail.com',
            'password': '123456789',
            'scope': '*',
        })
            .then(response => {
                //@ts-ignore
                localStorage.setItem('access_token', response.access_token);
                auth.notify('success', "Login successful!");
                Api.get('api/v1/student/get-step')
                    .then((response) => {
                        //@ts-ignore
                        console.log(response.success && response.step.id === 5)
                        //@ts-ignore
                        if (response.success && response.step.id === 5) {
                            toast.success("Parece que você ja completou o cadastro")

                            setTimeout(() => {
                                navigate('/student-id/validate/details/logged/')
                            }, 3000)

                        }else {
                            //@ts-ignore
                            navigate(response.step.redirect_uri)
                        }
                        // if (response.success)
                    })
                    .catch(error => {
                        auth.notify('error', error?.message || "Erro Desconhecido!");
                        console.error(error);
                    });

            })
            .catch(error => {
                auth.notify('error', error?.message || "Erro Desconhecido!");
                console.error(error);
            });
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
                    <Box p="2rem">
                        <Box>
                            <Box my="1rem">
                                <Typography variant="h6" fontWeight="bold">
                                    Realize o login para continuar!
                                </Typography>
                                <Stack mt={2} direction="column" justifyContent="space-between" gap={2}>
                                    <TextField
                                        id="filled-error-helper-text"
                                        label="Digite Seu CPF"
                                        variant="filled"
                                        required
                                        //@ts-ignore
                                        onChange={handleChangeCPF}
                                        value={cpf}
                                    />
                                    <TextField
                                        id="filled-error-helper-text"
                                        label="Digite a Senha"
                                        variant="filled"
                                        required
                                    />
                                </Stack>
                            </Box>

                            <Stack spacing="1rem" direction="column" mt="1rem">

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    size="large"
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    color="warning"
                                    onClick={handleBack}
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    Esqueci minha senha!
                                </Button>
                            </Stack>

                        </Box>
                    </Box>
                    <Stack spacing="0px" pl={4} direction="row" alignItems={"center"} mt="1rem">
                        <Typography style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                        }}>NÃO TEM CONTA?</Typography>
                        <Button
                            href={"/register"}
                            color="primary"
                            onClick={handleBack}
                            sx={{}}
                        >
                            Criar uma nova conta
                        </Button>
                    </Stack>
                </Card>
            </Box>
        </Container>
    );
};
