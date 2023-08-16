import SpotifyWebApi from "spotify-web-api-node";

const scopes = ["user-read-private", "user-top-read"].join(",");

const params = {
  scope: scopes,
};

const queryParamsString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString}&show_dialog=true`;

const spotifyApi = new SpotifyWebApi({
  clientId: "2db485676b5046f385bc7203dcac0a77",
  clientSecret: "695518e2b6fd4a679da486cc5063744b",
});

export default spotifyApi;
export { LOGIN_URL };
