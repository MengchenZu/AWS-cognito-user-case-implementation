import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
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

class RetrieveUserAttributes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        attributeName: '',
        attributeValue: '',
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleAttributeNameChange(e) {
    this.setState({attributeName: e.target.value});
  }

  handleAttributeValueChange(e) {
    this.setState({attributeValue: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    const attributeName = this.state.attributeName.trim();
    const attributeValue = this.state.attributeValue.trim();

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

            var attributeList = [];
            var attribute = {
                Name : attributeName,
                Value : attributeValue
            };
            var attribute = new CognitoUserAttribute(attribute);
            attributeList.push(attribute);

            cognitoUser.updateAttributes(attributeList, function(err, result) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log('call result: ' + result);
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
      <input type="text"
             value={this.state.attributeName}
             placeholder="AttributeName"
             onChange={this.handleAttributeNameChange.bind(this)}/>
      <input type="text"
             value={this.state.attributeValue}
             placeholder="AttributeValue"
             onChange={this.handleAttributeValueChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}

ReactDOM.render(<RetrieveUserAttributes />, document.getElementById('app'));
