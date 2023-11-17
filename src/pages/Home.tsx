import Navbar from "../components/Navbar";
import { useSpotify } from "../contexts/SpotifyContext";

const Home = () => {
  const { spotify, userProfile, topArtists, topSongs } = useSpotify();

  return (
    <>
      <Navbar />
      <div className="page">
        {Object.keys(userProfile).length > 0 &&
        Object.keys(topArtists).length > 0 &&
        Object.keys(topSongs).length > 0 ? (
          <>
            <h1>Welcome {userProfile.display_name}!</h1>
            <img
              className="profile-picture"
              src={userProfile.images[1].url}
              alt="profile picture"
              height={userProfile.images[1].height}
              width={userProfile.images[1].width}
            />
            <div className="top-things">
              <div className="scrollable-container">
                <h2 className="title">Your Top Artists Recently</h2>
                <ul className="horizontal-list">
                  {topArtists.items.slice(0, 10).map((item: any) => (
                    <li className="icon" key={item.id}>
                      <h3>{item.name}</h3>
                      <a
                        href={item.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="profile-picture"
                          src={item.images[0].url}
                          alt={`${item.name} Image`}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="scrollable-container">
                <h2 className="title">Your Top Songs Recently</h2>
                <ul className="horizontal-list">
                  {topSongs.items.slice(0, 10).map((item: any) => (
                    <li className="icon" key={item.id}>
                      <h3>{item.name}</h3>
                      <a
                        href={item.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="profile-picture"
                          src={item.album.images[0].url}
                          alt={`${item.name} Image`}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Home;
