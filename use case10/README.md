# Use case10
Disabling MFA for a user on a pool that has an optional MFA setting for an authenticated user.

Use the use case1 user pool and identity pool directly

Follow use case 1, 2, 4 and 9

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

Then we can run our use case10 example.

Because package amazon-cognito-identity-js@1.16.0 with react will lead to a
browser break down in some environments. We can install amazon-cognito-identity-js@1.15.0
instead, by following code first.

```
install amazon-cognito-identity-js@1.15.0
```

or use the following code directly:

```
npm install
npm run build
```

Open the 'index.html'

Input the username and password and then click submit

Wait and input the verification code from your SMS

Check AWS cognito user pools, in the users and groups tab,
under the username
