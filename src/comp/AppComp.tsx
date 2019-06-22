import * as React from 'react'
import { connect } from 'react-redux'
import { IState } from '../model/IState'
import { DispatchProp } from './DispatchProp'

interface AppCompPropsFromState {}
export interface AppCompProps extends AppCompPropsFromState, DispatchProp {}

export const AppComp = connect((state: IState): AppCompPropsFromState => ({}))(
	({ dispatch }: AppCompProps) => {
		return <div />
	},
)
