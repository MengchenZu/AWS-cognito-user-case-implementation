# Use case6
Verify user attribute for an authenticated user.

Note that the inputVerificationCode method needs to be defined but does not
need to actually do anything. If you would like the user to input the
verification code on another page, you can set inputVerificationCode to null.
If inputVerificationCode is null, onSuccess will be called immediately
(assuming there is no error).

Use the use case1 user pool and identity pool directly

Follow use case 1, 2, 4 and 5

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

Then we can run our use case6 example.

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

Input the username, password and the attribute name you want to verify

Press submit

Input the validation code and check the console
