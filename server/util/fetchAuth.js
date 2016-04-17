import * as Actions from '../../shared/redux/actions/auth-actions';

export function fetchIsAuthenticated(dispatch, request, passport) {
    return new Promise((resolve, reject) => {
       passport.authenticate('jwt-cookie', {session: false}, (err, user) => {
        if (user) {  
            dispatch(Actions.tokenValid());
        } else {
            console.log('invalid');
            dispatch(Actions.tokenInvalid());
        }
        resolve();
       })(request); 
    });
}