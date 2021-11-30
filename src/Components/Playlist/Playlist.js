import React from "react";
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

export class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(e){
        //accept event that is triggered by an onChange attribute in input
        this.props.OnNameChange(e.target.value);
    }
    
    render(){
        return (
            <div className="Playlist">
                <input value={this.props.defaultValue} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

Playlist.defaultProps = {defaultValue: 'New Playlist'};