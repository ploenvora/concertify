import spotifyApi from "../../../lib/spotify";
import { LOGIN_URL } from "../../../lib/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      // storing the client ID in the .env.local file somehow doesnt work which is super sad so i need to just insert it
      // clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientId: "2db485676b5046f385bc7203dcac0a77",
      //   clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      clientSecret: "695518e2b6fd4a679da486cc5063744b",
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: "some_secret_value",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // coming back to the site but the access token is still valid (within an hour)
      if (Date.now() < token.accessTokenExpires) {
        console.log("Access token is valid");
        return token;
      }

      // access token has expired
      console.log("Access token has expired");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      // console.log("session function ran")
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
});
