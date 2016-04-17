import React, { Component, PropTypes } from 'react';

class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleLogin() {
        const {email, password} = this.refs;
        this.props.handleLogin(email.value, password.value);
        email.value = password.value = '';
    }
    
    render() {
        return (
            <div className="login-form">
                <h2 className="form-title">Login</h2>
                <input placeholder="Email address" type="email" className="form-field" ref="email" />
                <input placeholder="Password" type="password" className="form-field" ref="password" />
                <a className="post-submit-button" href="#" onClick={this.handleLogin}>Login</a>
            </div>
        )
    }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object
};

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
};

export default LoginForm;