import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

interface Row {
  id: number;
  date: string;
  validThru: string;
  status: {
    text: string;
    color:
      | "warning"
      | "success"
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | undefined;
  };
  price: string;
}

export const HistoricPage = () => {
  const rows = [
    {
      id: 1,
      date: "10/10/2021",
      validThru: "10/10/2022",
      status: {
        text: "Expirado",
        color: "warning",
      },
      price: "R$ 20,00",
    },
    {
      id: 2,
      date: "10/10/2022",
      validThru: "10/10/2023",
      status: {
        text: "Ativo",
        color: "success",
      },
      price: "R$ 20,00",
    },
  ] satisfies Row[];

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
                  Detectamos que você já possui um cadastro
                  <br /> em nosso sistema.
                </Typography>
                <Typography fontWeight="medium" color="text.secondary">
                  Na lista abaixo você pode ver o histórico de suas
                  <br /> solicitações de carteirinhas.
                </Typography>
              </Stack>
            </Box>
            <Box>
              <TableContainer component={Paper} variant="outlined">
                <Table sx={{ minWidth: 650 }} size="small" aria-label="">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Data de emissão</TableCell>
                      <TableCell align="right">Data de validade</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Preço</TableCell>
                      <TableCell align="right">Detalhes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.validThru}</TableCell>
                        <TableCell align="right">
                          <Chip
                            variant="outlined"
                            color={row.status.color}
                            label={<Typography>{row.status.text}</Typography>}
                          />
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">
                          <Tooltip title="Ver">
                            <IconButton>
                              <RemoveRedEye />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};
