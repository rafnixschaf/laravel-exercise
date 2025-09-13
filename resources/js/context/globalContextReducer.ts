import { IGlobalContext } from '@/types/IGlobalContext';
import { INFO_STATUS, IStatusMessageTypes } from '@/types/IStatusMessageTypes';

export const SET_STATUS_MESSAGE = 'SET_STATUS_MESSAGE' as const ;
export const REMOVE_STATUS_MESSAGE = 'REMOVE_STATUS_MESSAGE' as const;

export const OPEN_DRAWER = 'OPEN_DRAWER' as const;
export const CLOSE_DRAWER = 'CLOSE_DRAWER' as const;

type IDrawerAction = typeof OPEN_DRAWER | typeof CLOSE_DRAWER;
type IStatusMessageAction = typeof SET_STATUS_MESSAGE | typeof REMOVE_STATUS_MESSAGE;


type ISetStatusMessageAction = {
    type: IStatusMessageAction;
    payload?: { message: string; type: IStatusMessageTypes };
};

type ISetDrawerAction = {
    type: IDrawerAction;
};

export type IGlobalAction = ISetStatusMessageAction | ISetDrawerAction;

type IHandler<Action> = (state: IGlobalContext, action: Action) => IGlobalContext;

type IGlobalReducer<Context, Action> = (state: Context, action: Action) => Context;
type IGlobalHandlerMap<Context, Action extends IGlobalAction> = {
    [T in Action["type"]]?: (state: Context, action: Extract<Action, { type: T }>) => Context;
};

const drawerHandler: Record<IDrawerAction, IHandler<ISetDrawerAction>> = {
    [OPEN_DRAWER]: (state) => ({ ...state, isDrawerOpen: true }),
    [CLOSE_DRAWER]:(state) => ({ ...state, isDrawerOpen: false }),
} ;

const statusMessageHandler: Record<IStatusMessageAction, IHandler<ISetStatusMessageAction>> = {
    [SET_STATUS_MESSAGE]: (state, action) => ({   ...state,
        statusMessage: { message: action?.payload?.message || '', type: action?.payload?.type || INFO_STATUS }}),
    [REMOVE_STATUS_MESSAGE]: (state) => ({ ...state, statusMessage: null }),
} satisfies Record<IStatusMessageAction, IHandler<ISetStatusMessageAction>>;


/**
 *  @TODO find a solution without casting the handlers
 *  with overloading we run into the same problem
 * @param handlers
 */
function createGlobalReducer<Context, Action extends IGlobalAction>(
    handlers: IGlobalHandlerMap<Context, Action>
): IGlobalReducer<Context, Action> {
    return (state: Context, action: Action) => {
        const fn = (handlers as any)[action.type] as
            | ((s: Context, a: Action) => Context)
            | undefined;
        return fn ? fn(state, action) : state;
    };
}
const handlers = {
    ...drawerHandler,
    ...statusMessageHandler,
};

export const globalContextReducer = createGlobalReducer<IGlobalContext, IGlobalAction>(handlers);
