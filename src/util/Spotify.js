let accessToken = '';
const clientId = '558d981e0f344059b0dc375ec0100b05';
const redirectURI = 'http://localhost:3000/';

export const Spotify = {
    getAccessToken(){
        if(accessToken !== ''){
            return accessToken;
        }

        // check url to see if it has just been obtained
        // i have no idea if this is correct ¯\_(ツ)_/¯
        const accessTokenURL = window.location.href.match(/access_token=([^&]*)/);
        const expiresInURL = window.location.href.match(/expires_in=([^&]*)/);

        // if access token and expiration time are in url, implement step 80
        if(accessTokenURL && expiresInURL){
            accessToken = accessTokenURL[1]
            const expiresIn = expiresInURL[1];
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI;
        }


    },

    search(searchTerm){
        // return a promise that resolves to a list of tracks from the search
        const term = 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm;
        const spotifyResponse = fetch(term, {headers: {Authorization: `Bearer ${accessToken}`}})
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
    }
}