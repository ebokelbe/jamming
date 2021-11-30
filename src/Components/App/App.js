import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {searchResults : [{name: 'Song 1', artist: 'artist 1', album: 'album 1', id: 1}, 
    {name: 'Song 2', artist: 'artist 2', album: 'album 2', id: 2}, 
    {name: 'Song 3', artist: 'artist 3', album: 'album 3', id: 3}],
    playlistName: 'Awesome Playlist', playlistTracks: [{name: 'Playlist Song 1', artist: 'artist 1', album: 'album 1', id: 1}, 
    {name: 'Playlist Song 2', artist: 'artist 2', album: 'album 2', id: 2}, 
    {name: 'Playlist Song 3', artist: 'artist 3', album: 'album 3', id: 3}]}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track){
    // use track id to check if cur song in playlistTracks state
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    // if id new add song to end of playlist
    let playlist = this.state.playlistTracks;
    playlist.push(track);
    // set new state of playlist
    this.setState({playlistTracks: playlist});
    // IF NOT ADDING TO PLAYLIST CORRECTLY, THIS IS LIKELY WRONG
  }
  
  removeTrack(track){
    // use track id to filter out of playlisttracks
    const newList = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    // set new state of playlist
    this.setState({playlistTracks: newList})
  }

  updatePlaylistName(name){
    // set state of playlist name to input name
    this.setState({playlistName: name})
  }

  render(){
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
    </div>
  </div>
</div>
    )
  }
}


export default App;