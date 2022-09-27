## How To Run Project

make sure node and npm is installed on your machine.

clone the git repository.

install the dependencies

```
npm i
```

### set-up environment variables

change the file named .env.txt to .env and set-up the env variables accordingly.

### run the project

```
npm start
```

### run in development mode

```
npm run dev
```

## API ENDPOINTS

### Public Endpoints

`/login` - A POST endpoint, requires username and password, returns jwt token upon verification.

### Protected Endpoints (must provide a valid jwt in request headers-Authentication)

`/patchjson` - A POST endpoint, takes json body with json object and patch object, returns patched json object.

`/createthumbnail` - A GET endpoint, takes a url query parameter (url of the image), returns a thumbnail image of the same of size 50x50

`/saveaddress` - A Post endpoint, takes json body with address parameter and creates and entry for the user with address.
