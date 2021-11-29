import React from "react";
import './TrackList.css'
import Track from "../Track/Track";

export class TrackList extends React.Component{
    render(){
        const trackLis = this.props.tracks.map(track => <Track key={track.id}>
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist}|{this.props.track.album}</p>
        </Track>);
        return (
            <div className="TrackList">
                {trackLis}
            </div>
        )
    }
}