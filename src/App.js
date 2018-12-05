import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


let defaultStyle = {
  color: '#fff'
};


class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2 >{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HourCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    } , [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2 >{Math.round(totalDuration/3600)} horas</h2>
      </div>
    );
  }
}

class Filter extends Component{
  render() {
    return(
      <div style={defaultStyle}>
        <img />
        <input type="text" onChange={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component{
  render() {
    let playList = this.props.playlist
     return (
       <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>{playList.name}</h3>
        <ul>
        {
          playList.songs.map(song =>
            <li>{song.name}</li>
          )
        }

        </ul>
       </div>
     );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
      let accessToken = new URLSearchParams(window.location.search).get('access_token');
      accessToken &&
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then(response=> response.json() ).then(data => this.setState({user: {name: data.display_name}}))
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then(response=> response.json() ).then(data => this.setState({
          playlists: data.items && data.items.map( item => ({
              name: item.name,
              songs: []
            }))
      }))
  }

  render() {
    let playlistsToRender =
    this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        ) : [];
    return (
      <div className="App">
      {this.state.user ?
        <div>
          {
            this.state.user &&
            <h1>
              Playlist do {this.state.user.name}
            </h1>
          }

          <PlaylistCounter playlists={
            playlistsToRender} />
          <HourCounter playlists={
            playlistsToRender} />
          <Filter onTextChange={(text) => { this.setState({filterString: text})}}/>
          {
            playlistsToRender.map(playlist =>
                <Playlist playlist={playlist}/>
            )
          }

        </div> : <button onClick={() => window.location = 'http://localhost:8888/login' } style={{padding: '20px', 'font-size': '50px', 'marginTop': '20px'}}> Login com o Spotify </button>
      }
      </div>
    );
  }
}

export default App;
