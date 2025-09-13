import { useFormBasic } from '@/stories/molecules/forms/hooks/formBasicHook';
import { useForm } from '@inertiajs/react';
import reportController from '@/actions/App/Http/Controllers/ReportController';
import { SET_STATUS_MESSAGE } from '@/context/globalContextReducer';
import { ERROR_STATUS, SUCCESS_STATUS } from '@/types/IStatusMessageTypes';
import { getMessagesFromInertia, getMessagesFromInertiaResponse } from '@/helper/getMessagesFromInertia';
import { ForwardedRef } from 'react';
import { IFormRef } from '@/types/IFormRef';

interface IUseGenerateReportModalForm {
    onSuccess?: () => void;
    ref?: ForwardedRef<IFormRef>;
}
export const useGenerateReportForm = ({...props}:IUseGenerateReportModalForm) => {
    const {globalDispatch} = useFormBasic();
    const {post} = useForm()

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        post(reportController.store().url, {
            onSuccess: (data) => {
                globalDispatch({type: SET_STATUS_MESSAGE, payload: {message: getMessagesFromInertiaResponse(data), type: SUCCESS_STATUS}})
                if (props.onSuccess) props.onSuccess();
            },
            onError: (e) => {
                globalDispatch({type: SET_STATUS_MESSAGE, payload: {message: getMessagesFromInertia(e), type: ERROR_STATUS}})
            }
        })
    }

    return {
        submit,
    }
};
