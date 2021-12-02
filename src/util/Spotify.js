let accessToken;

const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        // check url to see if it has just been obtained
        // i have no idea if this is correct ¯\_(ツ)_/¯
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        // if access token and expiration time are in url, implement step 80
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(searchTerm){
        // return a promise that resolves to a list of tracks from the search
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: {Authorization: `Bearer ${accessToken}`}})
                        .then(response => response.json())
                        .then(jsonResponse =>{
                            if(!jsonResponse.tracks){
                                return []; // return empty array if JSON response contains no tracks.
                            }
                            return jsonResponse.tracks.items.map(track => ({
                                id: track.id,
                                name: track.name,
                                artist: track.artists[0].name,
                                album: track.album.name,
                                uri: track.uri
                            }));
                        });
    },

    savePlaylist(playlistName, uriArray){
        if(!playlistName || !uriArray.length){
            return;
        }
        const access_Token = Spotify.getAccessToken();
        const header = {Authorization: `Bearer ${access_Token}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: header})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {headers : header,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
        }).then(response => response.json())
        .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: header,
                method: 'POST',
                body: JSON.stringify({uris: uriArray})
            })
        })
        })
    }
}

export default Spotify;

//TypeError: _util_Spotify__WEBPACK_IMPORTED_MODULE_5__.default.search(...) is undefined