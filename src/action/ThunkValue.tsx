import { ThunkAction } from 'redux-thunk'
import { IState } from '../model/IState'
import { TAction } from './TAction'

export type ThunkValue = ThunkAction<void, IState, void, TAction>
