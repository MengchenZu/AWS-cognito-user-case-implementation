import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import React from "react";
import ReactDOM from "react-dom";
import appConfig from "./config";

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      password: '',
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePhoneChange(e) {
    this.setState({phone: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const phone = this.state.phone.trim();
    const password = this.state.password.trim();

    var dataEmail = {
        Name: 'email',
        Value: email,
    }

    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: phone,
    }

    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    var attributeList = [];
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    // the variable 'username' in function userPool.signUp is the const username
    // if we want to use email as username, replace 'username' to email
    // the variable 'password' in function userPool.signUp is the const password
    // if we want to use input password as password, replace 'password' to password
    userPool.signUp('username', 'password', attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('user name is ' + result.user.getUsername());
      console.log('call result: ' + result);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="text"
               value={this.state.phone}
               placeholder="Phone"
               onChange={this.handlePhoneChange.bind(this)}/>
        <input type="password"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}

ReactDOM.render(<SignUpForm />, document.getElementById('app'));
