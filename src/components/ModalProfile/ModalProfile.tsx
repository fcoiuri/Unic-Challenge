import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Container
} from '@mui/material/';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      component="h1"
      sx={{ m: 0, p: 2, textAlign: 'center' }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface ModalProfileProps {
  modalState?: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

export const ModalProfile: React.FC<ModalProfileProps> = ({
  modalState,
  setModalOpen,
  title,
  children
}) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={modalState!}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {title}
          </BootstrapDialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions></DialogActions>
        </BootstrapDialog>
      </Container>
    </React.Fragment>
  );
};
