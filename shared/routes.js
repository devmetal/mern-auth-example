import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import PostContainer from './container/PostContainer/PostContainer';
import PostDetailView from './container/PostDetailView/PostDetailView';
import LoginContainer from './container/Login/LoginContainer';
import * as Actions from './redux/actions/auth-actions';

export default (store, req) => {
    
    let token = null;
    
    if (req && req.session.token) {
        token = req.session.token;
    }
    
    const requireLogin = (nextState, replace, cb) => {
        function checkAuth() {
            const { auth: { isAuthenticated }} = store.getState();
            if (!isAuthenticated) {
                replace('/login');
            }
            cb();
        }
        
        const { auth: { loaded }} = store.getState();
        if (!loaded) {
            store.dispatch(Actions.checkToken(token)).then(checkAuth);
        } else {
            checkAuth();
        }
    };
    
    return (
        <Route path="/" component={App} >
            <IndexRoute component={PostContainer} />
            <Route path="/post/:slug" component={PostDetailView} onEnter={requireLogin} />
            <Route path="/login" component={LoginContainer} />
        </Route>      
    )
};
