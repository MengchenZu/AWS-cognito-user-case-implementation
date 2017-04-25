# Use case3
Resending a confirmation code via SMS for confirming registration for a
unauthenticated user.

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

Then we can run our use case3 example, by following code in command line:

```
npm install
npm run build
```

Open the 'index.html'

Input the username

Press submit and check the tab 'Users and groups' in the user pools
