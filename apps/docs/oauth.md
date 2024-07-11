## For Google

1. Go to the Google Cloud Console.
2. Create a new project or select an existing one.
3. Navigate to ‘APIs & Services’ > ‘Credentials’.
4. Click on ‘Create Credentials’ and select ‘OAuth client ID’.
5. Set up the consent screen, and choose ‘Web application’ as the application type.
6. Add your application’s URI to ‘Authorized redirect URIs’, typically http://localhost:3000/api/auth/callback/google for local development.
7. Once created, you’ll get your Client ID and Client Secret.

## For Github

1. Go to the Github Settings
2. Scroll Down and You can see "Developer settings" in the left sidebar
3. Choose "Oauth App" to make new oauth github application
4. If it's your first time you will see "Register application" or not Choose "New Oauth App"
5. Fill the "Register a new Oauth Application" form
   in Development, you have to set homepage url as "http://localhost:3000"
6. For Authorization callback url, set it to "http://localhost:3000/api/auth/callback/github"
7. Once created, you'll get Client ID and Client Secret for github.

## For Facebook

1. Go to "https://developers.facebook.com/" and Sign in to it .
2. Go to "https://developers.facebook.com/apps" and Click "Create App".
3. Click on "Use cases" and choose "Customize" from "Authentication and account creation"
4. Fist Go "Permissions" And you can see "email" item and click "request" button
5. And then Go "Settings" and set "Deauthorize callback URL" to "https://localhost:3000/api/auth/callback/facebook"
6. Choose "App Settings" on Main Left Sidebar and There are 2 options "Basic" and "Advanced".
7. Click on "Basic" and you'll get App ID and App Secret.

## For Twitter

1. Go to "https://developer.twitter.com/en/portal/dashboard" and if you don't have developer account, sign up first.
2. When we have developer account and get there developer dashboard, Please choose "Projects & Apps"
3. There is Some nested thing first level is Project And Inner Child Level is Application.
4. Click application and you can see App details page and scroll down you'll see "User authentication settings".
5. Choose "Setup" and I'll lead you to "User authentication settings"
6. Choose "Web App, Automated App or Bot" on "Type of App"
7. In "App Info" section, please fill "Callback URI / Redirect URL" to "http://localhost:3000/api/auth/callback/twitter"
8. Add your domain, and you'll get Client ID and Client Secret
