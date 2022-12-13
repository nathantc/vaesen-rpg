# Setup local dev environment

1. Install Azure CLI
2. Install Azure Static Web App CLI: [https://github.com/Azure/static-web-apps-cli](https://github.com/Azure/static-web-apps-cli)
3. Add `local.settings.json` file to `/api` folder

## Running with Azure EMulators

### Successful approach so far:

1. Start react using `npm start` as normal. It will launch to localhost:3000.
2. Start the API emulator `swa start --api-location api`. It will start on `localhost:7071`.
3. Start the main emulator giving it URLs for both the dev and api servers. **IMPORTANT:** When starting the main emulator, use `127.0.0.1` rather than localhost (explanation in the Learnings section). ```swa start http://127.0.0.1:3000 --api-location http://127.0.0.1:7071```. The emulator will start on `localhost:4280`. Launching the app from that url will allow the emulator to proxy the auth and api for local development.

### Learnings

Local development for Azure Static Web Apps is explained [here](https://learn.microsoft.com/en-us/azure/static-web-apps/local-development).

The Static Web App CLI provides a script to run the Azure Static Web Emulators outside of VSCode. To run localling, 
first start React with `npm start` and then connect the emulator API by running `swa start http://localhost:3000 --api-location api`.
This has been the most reliable way to start the local instance. Another option is to configure SWA to
start both the React server instance and the API. It will proxy requests to the React instance port to the API port.

After continued experimenting, having the SWA emulator start and bind to both the React web server and API server has been frustrating at best. What I've learned so far:

1. SWA uses `wait-on` under the hood to look for the server instances. This package seems to fail when waiting on `locahost` but succeeds on `127.0.0.1`. Some comments have indicated this is a IPV4 vs IPV6 issues. However, `wait-on` is the only tool that seems to have issue where a `curl` command succeeds. 
2. The main emulator starts on port `4280`. This is not obivious unless you run `swa start` and attach to a running dev and api instance. 

## Common problems during setup

### Missing `local.settings.json` in API folder

The local setting file should **_NOT_** be committed into source control. It will need to be created when setting up local environment. 

**The error reported:** 

```sh: 1: react-scripts: not found
[run] cd "/home/user/app/my-app" && npm start exited with code 127
--> Sending SIGTERM to other processes..
[swa] node "/usr/local/lib/node_modules/@azure/static-web-apps-cli/dist/msha/server.js" exited with code SIGTERM
--> Sending SIGTERM to other processes..
[api] Can't determine project language from files. Please use one of [--csharp, --javascript, --typescript, --java, --python, --powershell, --custom]
[api] Can't determine project language from files. Please use one of [--csharp, --javascript, --typescript, --java, --python, --powershell, --custom]
[api] Can't determine project language from files. Please use one of [--csharp, --javascript, --typescript, --java, --python, --powershell, --custom]
[api] cd "/home/user/app/my-app/api" && /home/nathan/.swa/core-tools/v4/func start --cors "*" --port 7071  exited with code SIGTERM
```

**Simple local settings file:**

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```

# React Scripts

In the project directory, you can run:

### `swa start`

Runs the Azure Static Web Apps emulator backed by API and Authentication emulation.
This script uses the React Scripts start and reload the app when making changes. Changes
made in the API will require restarting the SWA. 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
