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

ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route component={DashBoard} path="/Dashboard">
                <IndexRoute component={Home}/>
                <Route path="*" component={NotFound} exact={true}/>
            </Route>
            <Route path="/Login" component={Login} exact={true}/>
            <Route component={Website} path="/">
                <IndexRoute component={Home}/>
                <Route path="*" component={NotFound} exact={true}/>
            </Route>
        </Router>
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
