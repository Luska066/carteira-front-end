import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ValidatePage = () => {
  const navigate = useNavigate();

  const handleValidate = () => {
    navigate("/student-id/validate/details");
  };

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
          LOGO
        </Typography>
        <Card sx={{ width: "100%" }}>
          <Box p="2rem">
            <Box>
              <Stack my="2rem" spacing={1}>
                <Typography variant="h6" fontWeight="bold">
                  Digite a senha da carteirinha para validar
                </Typography>
                <Typography fontWeight="medium" color="text.secondary">
                  A senha está localizada no verso da carteirinha ou escaneie o
                  QR Code
                </Typography>
              </Stack>
            </Box>
            <Stack>
              <TextField label="Senha" variant="filled" fullWidth />
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: "1rem",
                  mx: "auto",
                }}
                onClick={handleValidate}
              >
                <Typography variant="body2" fontWeight="bold">
                  Validar
                </Typography>
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};
