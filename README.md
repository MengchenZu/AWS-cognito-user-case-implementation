# AWS-cognito-user-case-implementation
This is the implementation of AWS cognito user case with steps by steps tutorial
using AWS Javascript SDK and react

The user cases come from the official tutorial.
    https://github.com/aws/amazon-cognito-identity-js/

For each use cases, they are:
Use case 1. Registering a user with the application. One needs to create a
CognitoUserPool object by providing a UserPoolId and a ClientId and signing up
by using a username, password, attribute list, and validation data.


Use case 2. Confirming a registered, unauthenticated user using a confirmation
code received via SMS.


Use case 3. Resending a confirmation code via SMS for confirming registration
for a unauthenticated user.





Common error issues:
1. Browser breaks down:

The reason of the error occurs is package amazon-cognito-identity-js@1.16.0 with react will lead to a
browser break down in some environments. You can install amazon-cognito-identity-js@1.15.0
instead, by following code first.

```
install amazon-cognito-identity-js@1.15.0
```

2. errorType: n.mfaRequired is not a function:

This error occurs when your user MFA have been enabled. You need to add the
following code into the 'cognitoUser.authenticateUser':

```
mfaRequired: function() {
    var mfaCode = prompt('Please input verification code: ' ,'');
    cognitoUser.sendMFACode(mfaCode, this)
}
```

For the example, you can follow the codes in use case10
