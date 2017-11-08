interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'HKRb1X6ReZI1h84zFakRje7wSd7DadHI',
  CLIENT_DOMAIN: 'royadams.eu.auth0.com',
  AUDIENCE: 'https://royadams.eu.auth0.com/api/v2/',
  REDIRECT: 'http://localhost:4200/blogs',
  SCOPE: 'openid email user_metadata app_metadata picture name'
};
