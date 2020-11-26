# Perfect Brows - A mobile application for scheduling eyebrow design

### What was used:
- 🐳 Docker
- 🗃️ PostgreSQL
- ⚛ **React** 
- 💅 **styled-components**
- 💖 **Lint** — ESlint/Prettier/Editor Config

### Requirements:

* Have Git to clone the project;
* Have Node.js installed;
* Have Docker running a container PostgreSQL.

### Starting environment - Docker:
``` bash
  # starting database on docker:
  $ docker start gostack_postegres
```

### Starting back-end (project dir: https://github.com/gabrielekiane/perfect-brows-web/tree/master/backend)
``` bash
  # Enter the backend directory:
  $ cd backend

  # Install dependencies:
  $ yarn

  # Run migrations:
  $ yarn typeorm migration:run

  # Running the application:
  $ yarn dev:server
``` 
  
 ### Starting app
``` bash
  # Enter the app directory:
  $ cd appperfectbrows

  # Install dependencies:
  $ yarn

  # Starting react-native emulador:
  $ yarn start
  # and (in other terminal)
  # Running react-native run-andoid to lauch de android emulator:
  $ yarn android 
 ``` 
 <br />

ASAP I will put de app's gif here <3
