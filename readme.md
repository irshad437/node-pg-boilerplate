## Auth using jwt

https://auth0.com/blog/hapijs-authentication-secure-your-api-with-json-web-tokens/

Use redis to save access_token
https://livebook.manning.com/book/hapi-js-in-action/chapter-9/47

access_token
128bit random string


key will be access_token
value will be json.stringify(userObj)

*NOTE*
Rename .env.sample to .env and add appropriate credentials.
Do not commit .env file to the project

<!-- 
key will be id
value will be {
                web: [access_token], 
                mobile: [access_token]
            } 
-->