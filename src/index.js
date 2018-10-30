import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import promise from 'redux-promise';
import decode from 'jwt-decode';

// application configuration.
import Website from './Website';
import DashBoard from './DashBoard';

import rootReducer from './reducers';
import initialState from '../src/reducers/initialState';
import NotFound from '../src/components/NotFound';
import Home from '../src/components/Home';
import Login from '../src/components/Login';

const composeEnhancers = composeWithDevTools({});
//const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(promise, logger)));
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, promise, logger)));


function requireAuth(nextState, replace) {
    if (!isLoggedIn()) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

export function isLoggedIn() {
    const accessToken = getAccessToken();
    return !!accessToken && !isTokenExpired(accessToken);
}

export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    if (expirationDate < new Date()) {
        clearAccessToken();
    }
    return expirationDate < new Date();
}


function getTokenExpirationDate(encodedToken) {
    try {
        const token = decode(encodedToken);
        if (!token.exp) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(token.exp);
        return date;
    } catch (error) {
        return null
    }
}

export function clearAccessToken() {
    localStorage.removeItem("accessToken");
}


function checkLoggedIn(nextState, replace) {
    const accessToken = getAccessToken();
    if (accessToken) {
        try {
            const decodedToken = decode(accessToken);
            if (decodedToken) {
                replace({
                    pathname: '/Dashboard',
                    state: {nextPathname: nextState.location.pathname}
                });
            }
        } catch (error) {
        }
    }
}


ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route component={DashBoard} path="/Dashboard">
                <IndexRoute component={Home} onEnter={requireAuth}/>
                <Route path="*" component={NotFound} exact={true}/>
            </Route>
            <Route path="/Login" component={Login} onEnter={checkLoggedIn} exact={true}/>
            <Route component={Website} path="/">
                <IndexRoute component={Home}/>
                <Route path="*" component={NotFound} exact={true}/>
            </Route>
        </Router>
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
