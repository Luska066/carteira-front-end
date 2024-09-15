import './style.css';
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
// import {axios} from 'axios'
import React from 'react';
import {DateTimeField} from "@mui/x-date-pickers";
import {useNavigate} from "react-router-dom";
import {Logo} from "../../components/logo"
import {useContext, useEffect, useState} from "react";
import {format} from 'date-fns';
import {AuthContext} from '../../contexts/AuthContext';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import {AppNotification} from '../../components/notification';
import {Term} from '../../components/Term';
import {Helpers} from "../../components/Helpers";

export const HomePage = (props: any): JSX.Element => {

    sessionStorage.clear();
    localStorage.setItem('isFormCorrected', "0")
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [dateNasc, setDateNasc] = useState<any>();
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    // const [terms, setTerms] = useState(false);
    // const [users, setUser] = useState<User>()
    const [msg, setMsg] = useState([]);
    let datas = {
        fullName: fullName,
        dateNasc: dateNasc,
        cpf: cpf,
        email: email,
        password: password,
        acceptTerms: acceptTerms
    }

    function emailMask(email: any) {
        var maskedEmail = email.replace(/([^@\.])/g, "*").split('');
        var previous = "";
        for (let i = 0; i < maskedEmail.length; i++) {
            if (i <= 1 || previous == "." || previous == "@") {
                maskedEmail[i] = email[i];
            }
            previous = email[i];
        }
        return maskedEmail.join('');
    }

    const handleCPFChange = (e: any) => {

        let cpfMaskTwo = Helpers.cpfMask(e.target.value);


        setCpf(cpfMaskTwo)

    }

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }

    const handleDataChange = (e: any) => {
        let date = format(new Date(e), 'yyyy-MM-dd');
        setDateNasc(date)
    }


    return (
        <main className="responsive">
            <Container maxWidth="lg">
                <ToastContainer/>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box>
                        {/* <Typography
            fontSize="2rem"
            fontWeight="bold"
            letterSpacing="3px"
            mb="1rem"
          >
          
          </Typography> */}


                        <Grid
                            container
                            direction={{
                                xs: "column",
                                md: "row",
                            }}
                            gap="2rem"
                        >
                            <Grid item component={Card} xs={12} md>
                                <Box padding="2rem" display="flex" flexDirection="column">
                                    <center>
                                        <Logo/>
                                    </center>
                                    <Typography fontSize="1.675rem" fontWeight="medium">
                                        Bem vindo(a)!
                                    </Typography>
                                    <Typography color="text.secondary" mt="0.675rem">
                                        Para continuar com a emissão da carteirinha digital preencha
                                        os campos a seguir
                                    </Typography>

                                    <Stack spacing={2} mt="3rem">
                                        <FormControl>
                                            {localStorage.getItem('isFormCorrected') === '0' && fullName.length < 5 &&
                                                <TextField

                                                    id="filled-error-helper-text"
                                                    label="Digite Seu Nome"
                                                    defaultValue={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    variant="filled"
                                                    required
                                                /> ||
                                                <TextField
                                                    label="Digite Seu nome"
                                                    name="fullname"
                                                    variant="filled"
                                                    defaultValue={''}
                                                    value={fullName}
                                                    required
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />}


                                        </FormControl>
                                        <FormControl>
                                            <DateTimeField
                                                label="Data de nascimento"
                                                name="dateNasc"

                                                variant="filled"
                                                format="DD/MM/YYYY"
                                                onChange={handleDataChange}
                                                required
                                            />
                                        </FormControl>
                                        <FormControl>
                                            {localStorage.getItem('isFormCorrected') === '0' && cpf.length < 14 &&
                                                <TextField
                                                    id="filled-error-helper-text"
                                                    label="Digite Seu CPF"
                                                    variant="filled"
                                                    required
                                                    value={cpf}
                                                    onChange={handleCPFChange}
                                                /> ||
                                                <TextField
                                                    label="Digite Seu CPF"
                                                    required
                                                    name="cpf"
                                                    variant="filled"
                                                    value={cpf}
                                                    onChange={handleCPFChange}
                                                />}

                                        </FormControl>
                                        <FormControl>
                                            {localStorage.getItem('isFormCorrected') === '0' && email.length < 5 &&
                                                <TextField
                                                    id="filled-error-helper-text"
                                                    label="Digite Seu Email"
                                                    variant="filled"
                                                    required
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                />
                                                ||
                                                <TextField
                                                    type="email"
                                                    required
                                                    label="Digite Seu Email"
                                                    name="email"
                                                    variant="filled"
                                                    value={email}
                                                    onChange={handleEmailChange}/>
                                            }

                                        </FormControl>
                                        <FormControl>
                                            {localStorage.getItem('isFormCorrected') === '0' && password.length < 8 &&
                                                <TextField
                                                    id="filled-error-helper-text"
                                                    label="Digite Sua Senha"
                                                    variant="filled"
                                                    helperText={"O Campo Precisa ter no Mínimo " + (8 - password.length) + " caracteres"}
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                /> ||
                                                <TextField
                                                    label="Digite sua  Senha"
                                                    type='password'
                                                    name="password"
                                                    variant="filled"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}/>
                                            }

                                        </FormControl>

                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item component={Card} xs={12} md overflow-x="auto" maxWidth={100}>
                                <Box
                                    padding="2rem"
                                    display="flex"
                                    flexDirection="column"
                                    height="100%"

                                >
                                    <Typography fontSize="1.675rem" fontWeight="medium">
                                        Como funciona?
                                    </Typography>

                                    <Box id="rules-container">
                                        Bem-vindo ao Student Pass - a sua porta de entrada para um mundo acadêmico
                                        conectado e prático!
                                        <h2>Passo 1: Cadastro Rápido</h2>


                                        Para começar sua jornada com o Student Pass, basta acessar nosso site e realizar
                                        um cadastro rápido. Informe seus dados básicos, como nome completo, instituição
                                        de ensino, curso e data de nascimento. Essas informações são essenciais para que
                                        possamos verificar sua elegibilidade como estudante.

                                        <h2>Passo 2: Verificação com a Instituição de Ensino</h2>


                                        Após preencher seus dados, nossa equipe realizará a verificação junto à sua
                                        instituição de ensino para confirmar sua matrícula e a validade das informações
                                        fornecidas. Esse processo garante a autenticidade do seu Student Pass.
                                        <h2>Passo 3: Validação Fácil</h2>


                                        Com a verificação concluída, você receberá um e-mail ou notificação informando
                                        que seu Student Pass está pronto para validação. Basta acessar sua conta e
                                        clicar no botão de confirmação para seguir para o próximo passo.
                                        <h2>Passo 4: Personalize com sua Foto</h2>


                                        Nada melhor do que uma carteirinha universitária com a sua cara, certo? Agora é
                                        a hora de adicionar um toque pessoal ao seu Student Pass. Escolha uma foto que
                                        te represente e faça o upload diretamente pelo nosso sistema. Certifique-se de
                                        que a imagem esteja clara e nítida, para que sua carteirinha fique perfeita!

                                        <h2>Passo 5: Pagamento Simples</h2>


                                        Com todos os passos anteriores concluídos, é hora de efetuar o pagamento do seu
                                        Student Pass. Oferecemos diferentes opções de pagamento, todas seguras e
                                        convenientes. Após a confirmação do pagamento, você estará cada vez mais próximo
                                        de acessar os benefícios exclusivos do Student Pass.

                                        <h2></h2>
                                        Passo 6: Recebendo seu Student Pass Digital

                                        Parabéns! Agora é só aguardar alguns instantes enquanto preparamos a sua
                                        carteirinha digital personalizada. Assim que estiver pronta, você receberá um
                                        link para fazer o download direto para o seu dispositivo. O Student Pass estará
                                        sempre com você, armazenado no seu smartphone ou tablet, pronto para ser
                                        apresentado quando necessário.

                                        <h2>Explore um Mundo de Oportunidades Acadêmicas</h2>

                                        Com o Student Pass em mãos, você terá acesso a diversas vantagens no ambiente
                                        acadêmico e além. Desde descontos exclusivos em livros e materiais escolares até
                                        acesso privilegiado a eventos culturais e esportivos, seu Student Pass abrirá
                                        portas para uma experiência universitária mais enriquecedora.

                                        Não perca tempo! Junte-se a milhares de estudantes que já estão aproveitando os
                                        benefícios do Student Pass. Faça seu cadastro agora mesmo e comece a aproveitar
                                        tudo o que esse universo de possibilidades tem a oferecer!

                                        Se você tiver alguma dúvida ao longo do processo, nossa equipe de suporte estará
                                        sempre pronta para ajudar. Estamos ansiosos para tê-lo(a) como parte da
                                        comunidade Student Pass. Seja bem-vindo(a) ao futuro acadêmico!


                                    </Box>
                                    <Box display={"flex"} alignItems={"space-around"} flexDirection={"row"}
                                         marginTop="3rem" mx="auto">
                                        <div>
                                            <div>
                                                <Term isVisible={datas}></Term>

                                            </div>
                                        </div>

                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </main>
    );
};
