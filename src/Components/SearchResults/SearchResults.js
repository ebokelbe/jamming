import React from "react";
import './SearchResults.css'
// TODO: import TrackList 

export class SearchResults extends React.Component{
    render(){
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList />
            </div>
        )
    }
}