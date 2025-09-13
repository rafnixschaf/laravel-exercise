import { IStatusMessageTypes } from '@/types/IStatusMessageTypes';

export interface IStatusMessage {
    message: string;
    type: IStatusMessageTypes;
}
