import { ThunkDispatch } from 'redux-thunk'
import { TAction } from '../action/TAction'
import { IState } from '../model/IState'

export interface DispatchProp {
	dispatch: ThunkDispatch<IState, void, TAction>
}
