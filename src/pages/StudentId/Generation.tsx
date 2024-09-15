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
import {AuthContext} from "../../contexts/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import React from 'react';
import {Logo} from "../../components/logo"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import configReducer from "../../redux/configuration/reducer";
import {Helpers} from "../../components/Helpers"
import Api from "../../components/Api";
import axios from "axios";
import pdf from '../../../public/assets/Profile.pdf'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export const GenerationPage = (): JSX.Element => {
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
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const [cardLink,setCardLink] = useState(null);
    // const {user} = useSelector(rootReducer => rootReducer.configReducer);
    const executeDownloadCardAutomatically = () => {
        Api.post('api/v1/student/download/card')
            .then((response) => {
                if(response.success){
                    setCardLink(response.data)
                    const link = document.createElement('a');
                    link.href = response.data;
                    link.target = '_blank';
                    link.download = 'carteira.pdf';
                    // Adiciona o link ao DOM
                    document.body.appendChild(link);

                    // Aciona o clique do link
                    link.click();

                    // Remove o link do DOM
                    document.body.removeChild(link);
                }

            })
    }
    useEffect(() => {
        executeDownloadCardAutomatically();
        setTimeout(() => {
            toast.warning('Carregando Recursos...')
            executeDownloadCardAutomatically();
            setTimeout(() => {
                navigate('/')
            },60000)
        },5000)
    }, []);

    const handleNext = async () => {
        const link = document.createElement('a');
        link.href = cardLink;
        link.download = 'carteira.pdf';
        // Adiciona o link ao DOM
        document.body.appendChild(link);

        // Aciona o clique do link
        link.click();

        // Remove o link do DOM
        document.body.removeChild(link);
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
                        <Logo/>
                </Typography>
                <Card sx={{width: "100%"}}>
                    <Box p="2rem">
                        <Typography variant="h6" fontWeight="bold">
                            BAIXAR CARTEIRA DE ESTUDANTE: ( Download Automático ):
                        </Typography>
                        <Typography variant="p" fontWeight="bold">
                            Caso não tenha baixado sua carteira ou caso não apareça no visor
                        </Typography>
                        <Box>
                            <div style={{
                                height: 500,
                                width: "100%",
                                marginTop:"1.01rem"
                            }}>
                                {cardLink != null && <embed src={cardLink} type={"application/pdf"} style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'scale-down',
                                    borderRadius: '5px',
                                }}/>}
                                {cardLink == null && <Typography>Sem Carteiras Disponíveis no momento</Typography>}
                            </div>

                            <Stack spacing="1rem" direction="column" mt="1rem">
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    color="error"
                                    size="large"
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    NÃO RECEBI MINHA CARTEIRA
                                </Button>
                            </Stack>

                        </Box>
                    </Box>

                </Card>
            </Box>
        </Container>
    );
};
