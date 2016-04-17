import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/auth-actions';
import LoginForm from '../../components/Login/LoginForm';

class LoginContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleLogin(email, password) {
        const creds = {email, password};
        this.props.dispatch(Actions.loginUser(creds));
    }
    
    render() {
        return (
            <div className="container">
                <LoginForm handleLogin={this.handleLogin} />
            </div>
        )
    }
}

LoginContainer.contextTypes = {
  router: React.PropTypes.object,
};

LoginContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    message: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
    return {
        isFetching: store.auth.isFetching,
        isAuthenticated: store.auth.isAuthenticated,
        message: store.auth.message
    }
}

export default connect(mapStateToProps)(LoginContainer);