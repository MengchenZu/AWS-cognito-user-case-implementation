# Use case1
Registering a user with the application. One needs to create a CognitoUserPool
object by providing a UserPoolId and a ClientId and signing up by using a
username, password, attribute list, and validation data.

First of all, set up the cognito user pools manually
Follow steps and steps, only change the following stuffs:
1. In tab Attributes, only tick email required and phone number required
2. In tab Apps, create a new app, untick the 'Generate client secret'

Second of all, create a new identity pool in Federated Identities

Afterwards, set up the AWS configuration

```js
// src/config.js
export default {
  region: '',
  IdentityPoolId: '',
  UserPoolId: '',
  ClientId: '',
}
```
For those variables:
1. UserPoolId can be found at the user pools, in tab pool details, at Pool Id
2. ClientId can be found at the user pools, in the tab apps, at app client Id
3. region can be found at the beginning of the UserPoolId, for example, if the
    UserPoolId is 'ap-southeast-2_XXXXXXXXX', the region is 'ap-southeast-2'
4. IdentityPoolId can be found at the Federated Identities, in dashboard, at the
    Authentication methods.


Then we can run our use case1 example, by following code in command line:

```
npm install
npm run build
```

Open the 'index.html'

Input email, phone number and password

Press submit and check the user pools
