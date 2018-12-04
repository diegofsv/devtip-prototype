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
       songs: [{name: 'Punk rock Song', duration: 1324}, {name: 'American Jesus', duration: 1324}]},
      {name: 'Heavy Metal',
       songs: [{name: 'Punk rock Song', duration: 1324}, {name: 'American Jesus', duration: 1324}]},
      {name: 'Thrash Metal',
       songs: [{name: 'Punk rock Song', duration: 1324}, {name: 'American Jesus', duration: 1324}]}
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
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component{
  render() {
     return (
       <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
       </div>
     );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData})}, 1000);
    }


  render() {
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
            this.state.serverData.user.playlists} />
          <HourCounter playlists={
            this.state.serverData.user.playlists} />
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div> : <h1 style={defaultStyle}> Carregando... </h1>}
      </div>
    );
  }
}

export default App;
