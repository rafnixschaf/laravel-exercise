import { GlobalDispatchContext } from '@/context/GlobalContext';
import { SET_STATUS_MESSAGE } from '@/context/globalContextReducer';
import { getMessagesFromInertia } from '@/helper/getMessagesFromInertia';
import { INetworkStatus } from '@/stories/atoms/NetworkStatus/NetworkStatus';
import { ERROR_STATUS, SUCCESS_STATUS } from '@/types/IStatusMessageTypes';
import { useForm } from '@inertiajs/react';
import { ForwardedRef, useContext, useImperativeHandle, useRef } from 'react';
import { ISetNetworkStatusFormRef } from '@/stories/molecules/forms/SaveNetworkInfoForm/SetNetworkStatusForm';

interface IUseSetNetworkStatusForm {
    onSuccess?: () => void;
    ref?: ForwardedRef<ISetNetworkStatusFormRef>;
}
export const useSetNetworkStatusForm = ({ ...props }: IUseSetNetworkStatusForm) => {
    const globalDispatch = useContext(GlobalDispatchContext);
    const { errors, post, setData, transform, data, clearErrors, resetAndClearErrors,  } = useForm({
        location: '',
        quality_score: 0,
    },

    );
    const networkRef = useRef<INetworkStatus>(null);

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const speed = networkRef.current?.getSpeed() || 0;

        // we need to transform the data before submitting, because setData is an asynchronous function
        transform((data) => ({ ...data, quality_score: speed }));

        post('/network', {
            onSuccess: () => {
                resetAndClearErrors();
                /**
                 * no idea what the reset function does, if we do not manually reset the data to the original state,
                 * we will eventually get old form data back into the form
                 */
                setData({ location: '', quality_score: 0 });

                globalDispatch({ type: SET_STATUS_MESSAGE, payload: { message: 'Network status saved', type: SUCCESS_STATUS } });
                if (props.onSuccess) props.onSuccess();
            },
            onError: (e) => {
                globalDispatch({ type: SET_STATUS_MESSAGE, payload: { message: getMessagesFromInertia(e), type: ERROR_STATUS } });
            },
        });
    };

    useImperativeHandle(props.ref, () => ({
        handleClose: () => clearErrors(),
    }))


    return {
        errors,
        submit,
        networkRef,
        setData,
        data,
    };
};
