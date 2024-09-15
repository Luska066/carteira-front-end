import {
    Box,
    Button,
    Card,
    Container,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Api from "../../../components/Api";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {Help} from "@mui/icons-material";
import {Helpers} from "../../../components/Helpers";
import {Logo} from "../../../components/logo";

export const DetailsPageLogged = () => {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        Api.get('api/v1/student/card')
            .then((response) => {

                {
                    //@ts-ignore
                }
                setUser(response)
            }).catch(() => {
            toast.error("Erro ao buscar credenciais")
        })
    }, [])
    return (
        <Container maxWidth="md">
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
                        <Box>
                            <Stack
                                direction={["column-reverse", "column-reverse", "row", "row"]}
                                justifyContent="space-between"
                            >
                                <Stack mb="2rem" spacing={1} flex="1">
                                    <Stack direction="column" spacing="1rem" width="50%">
                                        <Typography variant="body1" color="text.secondary">
                                            Busca de carteirinha
                                        </Typography>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Nome
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {
                                                    //@ts-ignore
                                                }
                                                {user?.student?.name || "Não foi possível carregar"}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Curso
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {user?.card?.nome_curso || "Não foi possível carregar"}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Data de nascimento
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {
                                                    //@ts-ignore
                                                }
                                                {Helpers.formateDateManually(user?.card?.data_nascimento) || "Não foi possível carregar"}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Código do aluno
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {
                                                    //@ts-ignore
                                                }
                                                {user?.card?.uuid || "Não foi possível carregar"}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Data de Início no Curso
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {
                                                    //@ts-ignore
                                                }
                                                {Helpers.formateDateManually(user?.card?.dataInicioCurso) || "Não foi possível carregar"}
                                            </Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="body1" color="text.secondary">
                                                Validade da carteirinha
                                            </Typography>
                                            <Typography variant="body1" fontWeight="medium">
                                                {
                                                    //@ts-ignore
                                                }
                                                {Helpers.formateDateManually(user?.card?.expiredAt) || "Não foi possível carregar"}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                {
                                    //@ts-ignore
                                }
                                {user?.student?.image_url != null && <Box
                                    sx={{
                                        display: "flex",
                                        width: "200px",
                                        height: "200px",
                                        justifyContent: "center",
                                        borderRadius: "1rem",
                                        alignItems: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        //@ts-ignore
                                        backgroundImage: "url(" + 'http://localhost:8000/storage/' + user?.student?.image_url.replace('public/', '') + ')' + "",
                                    }}
                                />}
                                {
                                    //@ts-ignore
                                }
                                {user?.student?.image_url == null && <Box
                                    sx={{
                                        display: "flex",
                                        width: "150px",
                                        height: "150px",
                                        justifyContent: "center",
                                        borderRadius: "1rem",
                                        alignItems: "center",
                                        backgroundColor: "#F5F5F5",
                                    }}
                                />}

                            </Stack>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};
