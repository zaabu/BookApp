const CLIENT_ID = process.env.CLIENT_ID || '0oadg4dlhXyMPxsQq4x6';
const ISSUER = process.env.ISSUER || 'https://dev-693919.okta.com/oauth2/default';

export default {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:8082/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: false,
};