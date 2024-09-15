import {CreditCard, Pix, Receipt} from "@mui/icons-material";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {
    Box,
    Button,
    Card,
    Container,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import {Logo} from "../../../components/logo"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {theme} from "../../../theme";
import Api from "../../../components/Api";
import {ToastContainer, toast} from "react-toastify";
import {ChannelAuthorizerGenerator, DeprecatedAuthOptions} from "pusher-js/src/core/auth/deprecated_channel_authorizer";
import {AuthTransport, Transport} from "pusher-js/src/core/config";
import {ChannelAuthorizationOptions, UserAuthenticationOptions} from "pusher-js/src/core/auth/options";
import * as nacl from "tweetnacl";

export const Pixs = (): JSX.Element => {
    const navigate = useNavigate();
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
    const [activeStep, setActiveStep] = useState(2);
    const [qrCode, setQrCode] = useState(null);
    const [qrCodeMessage, setQrCodeMessage] = useState(null);
    const [websocketId, setWebSocketId] = useState(null)

    //@ts-ignore
    window.Pusher = Pusher
    let Echos = new Echo({
        broadcaster: 'reverb',
        key: '6e1911549c4e',
        wsHost: '127.0.0.1',
        wsPort: 6001,
        wssPort: 6001,
        cluster: 'mt1',
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        disableStats: true,
        authEndpoint: 'http://localhost:8000/broadcasting/auth',
        auth: {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            withCredentials: true
        },

        encrypted: false,
        scheme: 'http',
    })

    Echos.private('payment.2')
        //@ts-ignore
        .listen('PaymentResponse', (response) => {
            console.log(response);
            if (response?.success && response?.status === "RECEIVED") {
                toast.success("Pagamento recebido!")
                setTimeout(() => {
                    navigate(response.step.step.redirect_uri)
                }, 3000)
            } else if (!response?.success && response?.status === "WAITING") {
                toast.success("Tivemos um problema com a validação, tente novamente mais tarde!")
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }
            //@ts-ignore
        }).error((e) => {
        console.log(e)
    });

    useEffect(() => {
        Api.get('api/v1/student/consult-qr-code')
            .then((response) => {
                //@ts-ignore
                if (response.success) {
                    toast.success("QrCode baixado!")
                    setQrCode(response.data)
                }
            }).catch(error => {
            if (error.message === "Erro ao consultar QrCode") {
                toast.error("Sua fatura ja foi paga ou expirou, consulte o suporte!")
                //@ts-ignore
                setQrCodeMessage("Ouve um erro ao consultar seu qrCode!Entre em contrato com o suporte.")
                // toast.error("Você será redirecionado em 5 segundos")
                // toast.error("Você poderá logar novamente, ou entre em contato com o suporte!")
                // setTimeout(() => {
                //     navigate('/')
                // }, 5000)
            }
        })

        Api.get('api/v1/student/websocket-identify')
            .then((response) => {
                console.log(response)
                //@ts-ignore
                setWebSocketId(response)
            })
    }, []);

    const jaEfetueiOPagemento = () => {
        Api.get('api/v1/student/has/execute/payment')
            .then((response) => {
                //@ts-ignore
                if (response.success) {
                    toast.warning("Caso você tenha efetuado o pagamento em 5 segundos você será redirecionado!")
                    toast.warning('Qualquer problema entre em contato com a faculdade')
                    navigate(response.data.step.redirect_uri)
                }
            }).catch((error) => {
            toast.error(error?.message || "Erro desconhecido!");
        })
    }

    return (
        <Container maxWidth="md">
            <ToastContainer/>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
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
                            <Box display="flex" flexDirection="column">
                                <Box my="4rem">
                                    <Stack direction="row" spacing={2}>
                                        <Box flex="1">
                                            <Typography color="text.secondary">
                                                Método de pagamento
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                mt="1rem"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Card
                                                    variant="outlined"
                                                    sx={{
                                                        flex: 1,
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                                                        },
                                                    }}
                                                >
                                                    <Stack p="1rem" px="1.675rem" spacing={1}>
                                                        <Pix/>
                                                        <Typography fontWeight="medium">PIX</Typography>
                                                    </Stack>
                                                </Card>
                                            </Stack>
                                        </Box>
                                        <Box flex="1">
                                            {qrCode != null && <img src={"data:image/png;base64," + qrCode}/>}
                                            {qrCodeMessage != null && <Typography>{qrCodeMessage}</Typography>}
                                            <Typography textAlign="right" color="text.secondary">
                                                Taxa de emissão de carteirinha
                                            </Typography>
                                            <Typography
                                                fontSize="1.675rem"
                                                fontWeight="bold"
                                                textAlign="right"
                                            >
                                                R$ 20,00
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Box onClick={jaEfetueiOPagemento} ml="auto">
                                    <Button>JA EFETUEI O PAGAMENTO</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};
