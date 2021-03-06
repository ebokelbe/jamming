import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  savePlaylist(){
    // generate array of uri values called trackURIs from playlistTracks property
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({playlistName: 'New Playlist', playlistTracks: []})
    })

  }

  search(term){
    Spotify.search(term).then(results => {
      this.setState({searchResults: results})
    })
  }

  render(){
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
    )
  }
}


export default App;