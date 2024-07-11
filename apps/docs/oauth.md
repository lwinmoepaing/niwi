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

