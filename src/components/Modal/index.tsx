import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './style.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


//@ts-ignore
export  const ChildModal = ({...props}): JSX.Element => {
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
  //navigate(steps[activeStep + 1].path);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let isOpens = props.isOpen;
  if(isOpens == true){
    return (
        <React.Fragment>
          <Modal
            className="modal"
            open={isOpens}
            onClose={handleClose}
            
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="child-modal-title">Deseja realmente confirmar os dados abaixo?</h2>
              <p id="child-modal-description">
                Tem certeza que deseja continuar??
              </p>
              <Button onClick={() => props.setOpenModal(!props.isOpen)}>Confirmar</Button>
              <Button onClick={() => props.setOpenModal(!props.isOpen)}>Fechar</Button>
            </Box>
          </Modal>
        </React.Fragment>
      );
  }
  
}

export  function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
