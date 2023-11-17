interface Props {
  title: string;
  artist: string;
  img: string;
}

const Song = ({ title, artist, img }: Props) => {
  return (
    <>
      <div className="song-in-playlist">
        <img className="song-image" src={img} />
        <div className="song-details">
          <p>{title}</p>
          <p>{artist}</p>
        </div>
      </div>
    </>
  );
};

export default Song;
