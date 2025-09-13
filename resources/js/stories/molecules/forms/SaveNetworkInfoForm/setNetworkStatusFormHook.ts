import { GlobalDispatchContext } from '@/context/GlobalContext';
import { SET_STATUS_MESSAGE } from '@/context/globalContextReducer';
import { getMessagesFromInertia, getMessagesFromInertiaResponse } from '@/helper/getMessagesFromInertia';
import { INetworkStatus } from '@/stories/atoms/NetworkStatus/NetworkStatus';
import { ERROR_STATUS, SUCCESS_STATUS } from '@/types/IStatusMessageTypes';
import { useForm } from '@inertiajs/react';
import { ForwardedRef, useImperativeHandle, useRef } from 'react';
import { useFormBasic } from '@/stories/molecules/forms/hooks/formBasicHook';
import { IFormRef } from '@/types/IFormRef';
import networkController from '@/actions/App/Http/Controllers/NetworkController';

interface IUseSetNetworkStatusForm {
    onSuccess?: () => void;
    ref?: ForwardedRef<IFormRef>;
}
export const useSetNetworkStatusForm = ({ ...props }: IUseSetNetworkStatusForm) => {
    const {globalDispatch} = useFormBasic();
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

        post(networkController.store().url, {
            onSuccess: (data) => {
                resetAndClearErrors();
                /**
                 * no idea what the reset function does, if we do not manually reset the data to the original state,
                 * we will eventually get old form data back into the form
                 */
                setData({ location: '', quality_score: 0 });

                globalDispatch({ type: SET_STATUS_MESSAGE, payload: { message: getMessagesFromInertiaResponse(data), type: SUCCESS_STATUS } });
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
