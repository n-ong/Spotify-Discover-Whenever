import Song from "./Song";

interface Props {
  songs: {};
}

const Playlist = (songs: Props) => {
  console.log(songs.songs);
  return (
    <ul className="playlist">
      {songs.songs.tracks.map((song: any) => (
        <li className="song" key={song.id}>
          <Song
            title={song.name}
            artist={song.artists[0].name}
            img={song.album.images[2].url}
          />
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
