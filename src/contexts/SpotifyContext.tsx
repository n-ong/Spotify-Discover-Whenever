import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import SpotifyWebApi from "spotify-web-api-js";

interface SpotifyContextValue {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
  userProfile: {};
  topArtists: {};
  topSongs: {};
}

const SpotifyContext = createContext<SpotifyContextValue | undefined>(
  undefined
);

export const useSpotify = (): SpotifyContextValue => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};

interface SpotifyProviderProps {
  children: ReactNode;
  spotifyInstance: SpotifyWebApi.SpotifyWebApiJs;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({
  children,
  spotifyInstance,
}) => {
  const [userProfile, setUserProfile] = useState({});
  const [topArtists, setTopArtists] = useState({});
  const [topSongs, setTopSongs] = useState({});

  useEffect(() => {
    // Fetch user profile data
    spotifyInstance.getMe().then((response) => {
      setUserProfile(response);
    });

    // Fetch top artists data
    spotifyInstance
      .getMyTopArtists({ time_range: "short_term" })
      .then((response) => {
        setTopArtists(response);
      });

    // Fetch top songs data
    spotifyInstance
      .getMyTopTracks({ time_range: "short_term" })
      .then((response) => {
        setTopSongs(response);
      });
  }, [spotifyInstance]);

  const value: SpotifyContextValue = {
    spotify: spotifyInstance,
    userProfile,
    topArtists,
    topSongs,
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};
