import {CreditCard, Pix, Receipt} from "@mui/icons-material";
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
import {Logo} from "../../components/logo"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {theme} from "../../theme";
import Api from "../../components/Api";
import {ToastContainer, toast} from "react-toastify";

export const CheckoutPage = (): JSX.Element => {
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

    const handleNext = () => {
        Api.post('api/v1/student/generate-card')
            .then((response) => {
                //@ts-ignore
                if(response.success){
                    console.log(response)
                    toast.success("Em instantes você será redirecionado para o pagamento, Aguarde !")
                    navigate(response.data.step.redirect_uri)
                }
            })
    };

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
                                <Box ml="auto">
                                    <Button onClick={handleNext}>Continuar</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};
