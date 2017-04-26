import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
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

class RetrieveUserAttributes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username.trim();
    const password = this.state.password.trim();

    var authenticationData = {
        Username : username,
        Password : password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());

            cognitoUser.forgotPassword({
                onSuccess: function () {
                    // successfully initiated reset password request
                },
                onFailure: function(err) {
                    alert(err);
                },
                //Optional automatic callback
                inputVerificationCode: function(data) {
                    console.log('Code sent to: ' + data);
                    var verificationCode = prompt('Please input verification code ' ,'');
                    var newPassword = prompt('Enter new password ' ,'');
                    cognitoUser.confirmPassword(verificationCode, newPassword, this);
                }
            });
        },

        onFailure: function(err) {
            console.log(err);
            alert(err);
        },
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
      <input type="text"
             value={this.state.username}
             placeholder="Username"
             onChange={this.handleUsernameChange.bind(this)}/>
      <input type="text"
             value={this.state.password}
             placeholder="Password"
             onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}

ReactDOM.render(<RetrieveUserAttributes />, document.getElementById('app'));
