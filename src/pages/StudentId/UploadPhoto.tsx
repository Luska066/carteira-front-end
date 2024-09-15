import "react-image-crop/dist/ReactCrop.css";
import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    Snackbar,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useNavigate} from "react-router-dom";
import {AddPhotoAlternate, Image as ImageIcon} from "@mui/icons-material";
import {useDisclose} from "../../hooks/useDisclose";
import ReactCrop, {type Crop} from "react-image-crop";
import {canvasPreview} from "../../hooks/canvasPreview";
import {useApi} from "../../hooks/useApi";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";
import {ToastContainer, toast} from "react-toastify";
import {Logo} from "../../components/logo"
import {Helpers} from "../../components/Helpers";
import Api from "../../components/Api";

export const UploadPhotoPage = (): JSX.Element => {
    const [file, setFile] = useState<File>();
    const [crop, setCrop] = useState<Crop>({
        unit: "px",
        width: 120,
        height: 120,
        x: 0,
        y: 0,
    });
    const [image, setImage] = useState();
    const imageRef = useRef<HTMLImageElement>(null);

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
    const [imageUrl, setImageUrl] = useState('');
    const [activeStep, setActiveStep] = useState(1);
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    const handleNext = async () => {


        if (!imageRef.current) return null;
        const canvas = document.createElement("canvas");
        const image = imageRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL("image/jpeg");
        const formData = new FormData();
        let blob = Helpers.dataURItoBlob(base64Image)
        formData.append("image_perfil", blob);

        Api.post('/api/v1/student/send-image',formData)
            .then((response) => {
                if(response.success){
                    auth.notify('success','Foto Salva com sucesso!');
                    navigate(response.data.step.redirect_uri)
                }
            })
            .catch((error) => {
                toast.error(error?.message || "Erro desconhecido!");
            });

    };

    const {
        isOpen: isOpenAcceptFileError,
        onClose: onCloseAcceptFileError,
        onOpen: onOpenAcceptFileError,
    } = useDisclose();
    const {
        isOpen: isOpenMultipleFilesError,
        onClose: onCloseMultipleFilesError,
        onOpen: onOpenMultipleFilesError,
    } = useDisclose();

    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles.length > 1) {
            onOpenMultipleFilesError();
            return;
        }

        if (!acceptedFiles[0].type.includes("image")) {
            onOpenAcceptFileError();
            return;
        }

        setFile(acceptedFiles[0]);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <Container maxWidth="md">
            <ToastContainer/>
            <Snackbar
                open={isOpenAcceptFileError}
                autoHideDuration={6000}
                onClose={onCloseAcceptFileError}
            >
                <Alert
                    onClose={onCloseAcceptFileError}
                    severity="error"
                    sx={{width: "100%"}}
                >
                    Você só pode enviar imagens, tente outro tipo de arquivo
                </Alert>
            </Snackbar>
            <Snackbar
                open={isOpenMultipleFilesError}
                autoHideDuration={6000}
                onClose={onCloseMultipleFilesError}
            >
                <Alert
                    onClose={onCloseMultipleFilesError}
                    severity="error"
                    sx={{width: "100%"}}
                >
                    Você só pode enviar uma foto
                </Alert>
            </Snackbar>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
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
                        <Box display="flex" flexDirection="column">
                            <Box my="1rem">
                                <Box {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <Box
                                            padding="3rem"
                                            border="2px dashed"
                                            borderColor="lightskyblue"
                                            borderRadius="1rem"
                                            paddingY="6rem"
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <AddPhotoAlternate fontSize="large" color="primary"/>
                                            <Typography textAlign="center">
                                                Ótimo trabalho, agora...
                                                <br/>
                                                <strong>Solte</strong> sua foto para enviar
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box
                                            padding="3rem"
                                            border="2px dashed"
                                            borderColor="GrayText"
                                            borderRadius="1rem"
                                            paddingY="6rem"
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            {/* <img src={imageUrl}></img> */}
                                            <ImageIcon fontSize="large" color="primary"/>
                                            <Typography textAlign="center">
                                                <strong>Arraste e solte</strong> sua foto aqui
                                                <br/> ou <strong>clique para selecionar</strong>
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                {file && (
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexDirection="column"
                                        mt="3rem"
                                    >
                                        <Typography
                                            mr="auto"
                                            fontWeight="bold"
                                            sx={{
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            Ótimo, agora ajuste sua imagem para colocar-mos na
                                            carteirinha
                                        </Typography>
                                        <ReactCrop
                                            aspect={1}
                                            // locked
                                            style={{
                                                maxWidth: "50%",
                                            }}
                                            crop={crop}
                                            onChange={(c) => setCrop(c)}
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="Foto do estudante"
                                                ref={imageRef}
                                            />
                                        </ReactCrop>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setFile(undefined)}
                                            sx={{marginTop: "1rem"}}
                                        >
                                            Remover
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                            <Box ml="auto">
                                <Button onClick={handleNext} disabled={!file}>
                                    Continuar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};
