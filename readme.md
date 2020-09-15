Acess Token:

- Use redis to save 128bit random string access_token
- key will be access_token value will be json.stringify(userObj)

_NOTE_
Rename .env.sample to .env and add appropriate credentials.
Do not commit .env file to the project

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
6. Check documentation on /documentation
7. hit the endpoints present in the routes directory or in documentation

Technologies Uses:

- NodeJS
- PostgreSQL
- Redis
