import * as Actions from '../../shared/redux/actions/auth-actions';

export function fetchIsAuthenticated(dispatch, request, passport) {
    return new Promise((resolve, reject) => {
       passport.authenticate('jwt-session', {session: false}, (err, user) => {
        if (user) {  
            dispatch(Actions.tokenValid());
        } else {
            dispatch(Actions.tokenInvalid());
        }
        resolve();
       })(request); 
    });
}