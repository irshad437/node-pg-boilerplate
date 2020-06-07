## Auth using jwt

https://auth0.com/blog/hapijs-authentication-secure-your-api-with-json-web-tokens/

Use redis to save access_token
https://livebook.manning.com/book/hapi-js-in-action/chapter-9/47

access_token
128bit random string

key will be access_token
value will be json.stringify(userObj)

_NOTE_
Rename .env.sample to .env and add appropriate credentials.
Do not commit .env file to the project

<!--
key will be id
value will be {
                web: [access_token],
                mobile: [access_token]
            }
-->

Features:

- Logging of every request
- Error logging
- Login/Signup using email and passwod
- Redis based auth management
- Refresh access token validity on every request automatically, so that the session doesn't expire when in use
- Plug and play

To run the project:

1. Clone the project in a directory
2. Goto project directory
3. run `npm install`
4. Rename .env.sample to .env and add credentials to .env file
5. run `npm run dev`
6. hit the endpoints present in the routes directory

Technologies Uses:
- NodeJS
- PostgreSQL
- Redis
