import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { configureStore } from 'redux-starter-kit'
import { AppComp } from './comp/AppComp'
import './index.scss'
import { reduceState } from './reducer/reduceState'
import * as serviceWorker from './serviceWorker'

export const store = configureStore({
	reducer: reduceState,
})

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<AppComp />
		</Provider>
	</HashRouter>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
