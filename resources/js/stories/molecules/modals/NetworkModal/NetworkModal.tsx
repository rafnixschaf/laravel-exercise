import {
    SetNetworkStatusForm,
} from '@/stories/molecules/forms/SaveNetworkInfoForm/SetNetworkStatusForm';
import { MyModal } from '@/stories/molecules/modals/MyModal/MyModal';
import { useRef } from 'react';
import { IFormRef } from '@/types/IFormRef';

interface INetworkModal {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export const NetworkModal = ({ ...props }: INetworkModal) => {
    const formRef = useRef<IFormRef>(null);

    const handleClose = () => {
        props.setOpen(false)
        formRef.current?.handleClose();
    }

    return (
        <MyModal open={props.open} setOpen={props.setOpen} onClose={() => handleClose()}>
            <SetNetworkStatusForm formRef={formRef} onSave={() => props.setOpen(false)} />
        </MyModal>
    );
};
