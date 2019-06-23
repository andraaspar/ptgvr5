import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { IState } from '../model/IState'
import { RouteShowLocationParams } from '../routing/RouteShowLocation'
import { DispatchProp } from './DispatchProp'

interface ShowLocationCompPropsFromState {}
export interface ShowLocationCompProps
	extends ShowLocationCompPropsFromState,
		DispatchProp,
		RouteComponentProps<RouteShowLocationParams> {}

export const ShowLocationComp = withRouter(
	connect((state: IState): ShowLocationCompPropsFromState => ({}))(
		({ dispatch, match }: ShowLocationCompProps) => {
			return <div>Show location: {match.params.locationId}</div>
		},
	),
)
