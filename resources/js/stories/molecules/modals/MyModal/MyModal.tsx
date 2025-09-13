import { Modal } from '@mui/material';
import { ComponentProps } from 'react';

type IMyModal = ComponentProps<typeof Modal> & {
    open: boolean;
    setOpen: (open: boolean) => void;
};
export const MyModal = ({ keepMounted = true, ...props }: IMyModal) => {
    return (
        <Modal
            keepMounted={keepMounted}
            open={props.open}
            onClose={(e, r) => {if(typeof props.onClose === 'function') {props.onClose(e, r)}}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {props.children}
        </Modal>
    );
};
