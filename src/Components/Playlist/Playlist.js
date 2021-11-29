import React from "react";
import './Playlist.css';
// TODO: import TrackList

export class Playlist extends React.Component{
    render(){
        return (
            <div className="Playlist">
                <input value={this.props.defaultValue}/>
                <TrackList />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

Playlist.defaultProps = {defaultValue: 'New Playlist'};