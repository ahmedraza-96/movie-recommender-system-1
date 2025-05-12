# Movie Recommender System

A React-based web application that recommends movies based on user preferences using content-based filtering and clustering techniques.

## Deployment on Vercel

### Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. Git installed on your local machine

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   cd movie-app
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/movie-recommender-system.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   
   - Log in to your Vercel account
   - Click on "Import Project"
   - Select "Import Git Repository"
   - Enter your GitHub repository URL
   - Configure the project:
     - Framework Preset: Create React App
     - Root Directory: movie-app
     - Build Command: npm run build
     - Output Directory: build
   - Click "Deploy"

3. **Environment Variables (if needed)**
   
   If you need to set environment variables, you can do so in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" tab
   - Add any necessary variables (e.g., API keys)

## Backend Connection

The frontend is configured to connect to the backend API at:
```
https://movie-recommender-system2.onrender.com
```

If you need to change this URL, update the following files:
- src/components/Home.jsx

## Available Scripts

In the project directory, you can run:

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
