import * as React from 'react'
import { connect } from 'react-redux'
import { IState } from '../model/IState'
import { DispatchProp } from './DispatchProp'

interface AddLocationCompPropsFromState {}
export interface AddLocationCompProps
	extends AddLocationCompPropsFromState,
		DispatchProp {}

export const AddLocationComp = connect(
	(state: IState): AddLocationCompPropsFromState => ({}),
)(({ dispatch }: AddLocationCompProps) => {
	return <div>Add location</div>
})
