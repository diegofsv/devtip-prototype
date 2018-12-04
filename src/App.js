import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'Diego',
    playlists: [
      {name: 'Punk Rock',
       songs: [{name: 'Punk rock Song', duration: 1324}, {name: 'American Jesus', duration: 1324}]},
      {name: 'Industrial',
       songs: [{name: 'Perfect Drug', duration: 1324}, {name: 'The Becoming', duration: 1324}]},
      {name: 'Heavy Metal',
       songs: [{name: 'N.I.B.', duration: 1324}, {name: 'Hallowed be Thy Name', duration: 1324}]},
      {name: 'Thrash Metal',
       songs: [{name: 'Angel of Death', duration: 1324}, {name: 'Raining Blood', duration: 1324}, {name: 'One', duration: 1324}]}
    ]
  }
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
    setTimeout(() => {
      this.setState({serverData: fakeServerData})}, 1000);

    }


  render() {
    let playlistsToRender = this.state.serverData.user ? this.state.serverData.user.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
    ) : [];
    return (
      <div className="App">
      {this.state.serverData.user ?
        <div>
          {
            this.state.serverData.user &&
            <h1>
              Playlist do {this.state.serverData.user.name}
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

        </div> : <h1 style={defaultStyle}> Carregando... </h1>}
      </div>
    );
  }
}

export default App;
