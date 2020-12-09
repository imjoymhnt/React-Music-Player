import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Libray from './components/Library';
import "./style/app.scss";
import data from "./data";
import Nav from './components/Nav';


const App = () => {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
    const[songInfo, setSongInfo] = useState({
        currentTime: 0,
      duration: 0,
        animationPercentage: 0
    })
  const[libraryStatus, setLibraryStatus] = useState(false)

   // Ref
  const audioRef = useRef(null);
  // Event
  const timeUpdateHandler = (e) => {
        const current = e.target.currentTime
        const duration = e.target.duration
        const roundedCurrent = Math.round(current)
        const roundedDuration = Math.round(duration)
        const animation = Math.round((roundedCurrent/roundedDuration)*100)
        setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
  }
  const songEndHandler = async () => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      if(isPlaying) audioRef.current.play()
    }
  

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />

      <Player
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <Libray libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs} />
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
