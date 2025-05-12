# Step-by-Step Guide to Deploy Your Movie Recommender System on Vercel

This guide will walk you through the process of deploying your React frontend to Vercel.

## Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. Git installed on your local machine

## Step 1: Prepare Your Repository

1. If you haven't already, initialize a Git repository in your project folder:
   ```bash
   cd /path/to/your/project
   git init
   ```

2. Add all files to the repository:
   ```bash
   git add .
   ```

3. Commit the changes:
   ```bash
   git commit -m "Initial commit for Vercel deployment"
   ```

4. Create a repository on GitHub: 
   - Go to github.com
   - Click on "New repository"
   - Name your repository (e.g., "movie-recommender-system")
   - Click "Create repository"

5. Link your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/movie-recommender-system.git
   ```

6. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
   (If your default branch is named "master", use that instead of "main")

## Step 2: Deploy on Vercel

1. Log in to your Vercel account at https://vercel.com

2. Click "Add New" > "Project"

3. Import your Git repository:
   - Select your GitHub account
   - Find and select your "movie-recommender-system" repository
   - Click "Import"

4. Configure your project:
   - Set the root directory to "movie-app"
   - Framework Preset: Create React App
   - Build Command: npm run build (should be auto-filled)
   - Output Directory: build (should be auto-filled)

5. Environment Variables:
   - Expand the "Environment Variables" section
   - Add the following variables:
     - Name: REACT_APP_API_KEY, Value: 8321fba1bd0a71fd23430a1b4d42bfd9
     - Name: REACT_APP_BACKEND_URL, Value: https://movie-recommender-system2.onrender.com

6. Click "Deploy"

7. Wait for the deployment to complete. Vercel will provide a URL for your deployed application.

## Step 3: Verify Your Deployment

1. Once the deployment is complete, click on the provided URL to open your application.

2. Test your application to ensure everything is working properly:
   - Check that movie data is loading
   - Verify that movie recommendations are working
   - Test the search functionality

## Troubleshooting

If you encounter any issues during deployment:

1. **Build Errors**: Check the build logs in the Vercel dashboard for specific error messages.

2. **API Connection Issues**: Verify that your environment variables are set correctly in the Vercel dashboard.

3. **Backend Connection Problems**: 
   - Make sure your backend is accessible at the URL you've specified
   - Check for CORS issues if the frontend can't connect to the backend

4. **Need to Update Your Deployment**: 
   - Make changes locally
   - Commit and push to GitHub
   - Vercel will automatically redeploy your site

## Congratulations!

Your Movie Recommender System is now deployed on Vercel. You can share the URL with others to let them use your application. 