import { useState, useEffect } from "react";
import { useSpotify } from "../contexts/SpotifyContext";
import Navbar from "../components/Navbar";
import Playlist from "../components/Playlist";

const CreatePlaylist = () => {
  const [songs, setSongs] = useState({});
  const [songURIs, setSongURIs] = useState<string[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { spotify, topSongs, userProfile } = useSpotify();

  const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  //Randomly pick five songs from user's top songs
  let shuffledTopSongs = topSongs.items;
  shuffle(shuffledTopSongs);

  let seeds = "";
  shuffledTopSongs.slice(0, 5).map((item: any) => (seeds += item.id + ","));
  seeds = seeds.substring(0, seeds.length - 1);

  const generatePlaylist = () => {
    setIsLoading(true);
    spotify.getRecommendations({ seed_tracks: seeds }).then((response) => {
      let songIDsFromResponse: string[] = [];
      response.tracks.map((item: any) => songIDsFromResponse.push(item.uri));

      setSongURIs(songIDsFromResponse);
      setSongs(response);
      setIsLoading(false);
    });
  };

  const savePlaylist = () => {
    const playlistDescription = {
      name: "Discover Whenever Playlist",
    };
    let playlistId = "";

    spotify
      .createPlaylist(userProfile.id, playlistDescription)
      .then((response) => {
        playlistId = response.id;

        spotify.addTracksToPlaylist(playlistId, songURIs).then((response) => {
          console.log(response);
        });
      });
  };

  useEffect(() => {}, [songs]);

  return (
    <>
      <Navbar />
      <div className="page">
        <h1>Playlist Generator</h1>
        <button onClick={generatePlaylist}>Generate</button>
        {Object.keys(songs).length > 0 && (
          <button onClick={savePlaylist}>Save</button>
        )}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          Object.keys(songs).length > 0 && <Playlist songs={songs} />
        )}
      </div>
    </>
  );
};

export default CreatePlaylist;
