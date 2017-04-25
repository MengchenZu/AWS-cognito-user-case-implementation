# Use case2
Confirming a registered, unauthenticated user using a confirmation code
received via SMS.

Use the use case1 user pool and identity pool directly

Register an user

Set up the AWS configuration

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
4. IdentityPoolId can be found at the Federated Identities. in dashboard, click
    'Edit Identity Pool'. There is Identity Pool ID.

First of all, get the confirmation code from email or SMS

Then we can run our use case2 example, by following code in command line:

```
npm install
npm run build
```

Open the 'index.html'
Input the username and confirmation code
Press submit and check the tab 'Users and groups' in the user pools
