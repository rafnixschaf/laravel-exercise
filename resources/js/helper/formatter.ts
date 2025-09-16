import { INetwork } from '@/types';
import { format } from 'date-fns';


export const formatDownloadSpeed = (speed: number) =>
    `${Number.isNaN(speed) ? 0 : speed} Mbit/s`;

export const formatNetworkData = (data: INetwork[]) =>
    data.map(d => d.location).join(', ')

export const formateDate = (date: string) => format(date, "dd.MM.yyyy, HH:mm 'Uhr'",);
