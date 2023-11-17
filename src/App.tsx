import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import CreatePlaylist from "./pages/CreatePlaylist";
import { SpotifyProvider } from "./contexts/SpotifyContext";
import Spotify from "spotify-web-api-js";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const spotify = new Spotify();

  useEffect(() => {
    //check if we got a response from the server
    if (window.location.hash) {
      const paramsInURL = window.location.hash.slice(1).split("&");
      const firstField = paramsInURL[0].split("=")[0];
      //check if user granted access to their account
      if (firstField === "access_token") {
        let urlTokens: { [key: string]: string } = {};

        paramsInURL.forEach((pair) => {
          const [key, value] = pair.split("=");
          urlTokens[key] = value;
        });

        spotify.setAccessToken(urlTokens["access_token"]);

        setLoggedIn(true);
      } else {
        console.log("Error with log in");
      }
      //clean up url to remove token values / error code
      history.replaceState(
        {},
        document.title,
        window.location.href.split("#")[0]
      );
    }
  }, []);

  return (
    <div className="content">
      {loggedIn ? (
        <SpotifyProvider spotifyInstance={spotify}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePlaylist />} />
            </Routes>
          </Router>
        </SpotifyProvider>
      ) : null}
      {!loggedIn && <Login />}
    </div>
  );
};

export default App;
