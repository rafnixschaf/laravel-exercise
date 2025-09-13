import { IFormRef } from '@/types/IFormRef';

export interface IForm {
    onSave: () => void;
    // need a custom property because on a form, react expects a html element
    formRef?: React.Ref<IFormRef>
}
