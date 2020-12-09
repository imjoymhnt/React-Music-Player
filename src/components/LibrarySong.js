import React from 'react';

const LibrarySong = ({ song, songs, setSongs, id, setCurrentSong, audioRef, isPlaying }) => {
    const songSelectHandler = async(e) => {
        await setCurrentSong(song)
        if(isPlaying) audioRef.current.play();
    }
    const newSongs = songs.map((song) => {
        if (song.id === id) {
            return {
                ...song,
                active: true
            };
        } else {
            return {
                ...song,
                active: false
            };
        }
    });
    // setSongs(newSongs)
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img src={song.cover} alt="" />
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4> {song.artist} </h4>
            </div>
        </div>
    )
}

export default LibrarySong;