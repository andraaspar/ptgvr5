import * as React from 'react'
import { connect } from 'react-redux'
import {
	Redirect,
	Route,
	RouteComponentProps,
	Switch,
	withRouter,
} from 'react-router'
import { IState } from '../model/IState'
import { ROUTE_SHOW_LOCATION } from '../routing/RouteShowLocation'
import { AddLocationComp } from './AddLocationComp'
import { DispatchProp } from './DispatchProp'
import { SelectLocationComp } from './SelectLocationComp'
import { ShowLocationComp } from './ShowLocationComp'

interface AppCompPropsFromState {}
export interface AppCompProps
	extends AppCompPropsFromState,
		DispatchProp,
		RouteComponentProps {}

export const AppComp = withRouter(
	connect((state: IState): AppCompPropsFromState => ({}))(
		({ dispatch }: AppCompProps) => {
			return (
				<>
					<Switch>
						<Route path='/' exact component={SelectLocationComp} />
						<Route
							path='/add-location'
							component={AddLocationComp}
						/>
						<Route
							path={ROUTE_SHOW_LOCATION}
							component={ShowLocationComp}
						/>
						<Redirect to='/' />
					</Switch>
				</>
			)
		},
	),
)
