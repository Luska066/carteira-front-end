import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const DetailsPage = () => {
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
                        Status
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        Ativa
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" color="text.secondary">
                        Curso
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        Engenharia de Software
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" color="text.secondary">
                        Data de nascimento
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        18/07/2004
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" color="text.secondary">
                        Código do aluno
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        0027B2A
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" color="text.secondary">
                        Data de Início no Curso
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        01/01/2023
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" color="text.secondary">
                        Validade da carteirinha
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        01/01/2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    width: "150px",
                    height: "150px",
                    justifyContent: "center",
                    borderRadius: "1rem",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};
