# NodePop

A React application that uses the [Nodepop API](https://github.com/IsmaelB83/keepcoding-backend-node) developed in Node.

## Available Scripts

In the project directory, you can run (after the `npm/yarn install` command):

### `yarn start` or `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test` or `npm run test` (not used in this project)

Launches the test runner in the interactive watch mode.<br />

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### Instructions

The web page seems intuitive, but just in case I will explain the functionality:

- The entry point is the register page.
- Every route the user try to go, if not registered, will go directly to the register. If registered, will go to the home page.
- Is user doesn't click in "Quiero mantener mi sesión activa" once refreshed the session will expire.
- Once registration is done, it will load the list of adverts filtered with the tag given in the process.
- The user can also filter the list by using the form given in the home.
- Clicking in an advert the user will go into the advert detail.
- The user can also create an advert from scratch by clicking in the button at the left side of the navbar.
- Also, by clicking in the edit icon from the advert card, the user will be able to edit the same.
- Additionally, the user can both logout and see profile by clicking in the user icon at the right side of the navbar.
- In case you choose another path not known by the app, it will return you a 404 page.

### Adding hooks

- For this exercise I have added Redux for managing user info and loading adverts.
- I have refactored my Home component to add hooks (useState and useEffect). The rest I kept it using class and internal state.
-

### Tests

- I have placed the \*.test.js under the file to be tested.
- I have decided to test actions, and xx component

## Author

- **Jorge Martín**
