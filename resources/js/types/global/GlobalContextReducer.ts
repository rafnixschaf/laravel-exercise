import { IStatusMessageTypes } from '@/types/IStatusMessageTypes';
import { IGlobalContext } from '@/types/IGlobalContext';

export const SET_STATUS_MESSAGE = 'SET_STATUS_MESSAGE' as const ;
export const REMOVE_STATUS_MESSAGE = 'REMOVE_STATUS_MESSAGE' as const;

export const OPEN_DRAWER = 'OPEN_DRAWER' as const;
export const CLOSE_DRAWER = 'CLOSE_DRAWER' as const;

export type IDrawerAction = typeof OPEN_DRAWER | typeof CLOSE_DRAWER;
export type IStatusMessageAction = typeof SET_STATUS_MESSAGE | typeof REMOVE_STATUS_MESSAGE;


export type ISetStatusMessageAction = {
    type: IStatusMessageAction;
    payload?: { message: string; type: IStatusMessageTypes };
};

export type ISetDrawerAction = {
    type: IDrawerAction;
};

export type IGlobalAction = ISetStatusMessageAction | ISetDrawerAction;

export type IHandler<Action> = (state: IGlobalContext, action: Action) => IGlobalContext;

export type IGlobalReducer<Context, Action> = (state: Context, action: Action) => Context;
export type IGlobalHandlerMap<Context, Action extends IGlobalAction> = {
    [T in Action["type"]]?: (state: Context, action: Extract<Action, { type: T }>) => Context;
};
