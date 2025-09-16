import { IGlobalContext } from '@/types/IGlobalContext';
import { INFO_STATUS } from '@/types/IStatusMessageTypes';
import {
    CLOSE_DRAWER,
    IDrawerAction,
    IGlobalAction,
    IGlobalHandlerMap,
    IGlobalReducer,
    IHandler,
    ISetDrawerAction,
    ISetStatusMessageAction,
    IStatusMessageAction,
    OPEN_DRAWER,
    REMOVE_STATUS_MESSAGE,
    SET_STATUS_MESSAGE,
} from '@/types/global/GlobalContextReducer';


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
