import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './App.css';

const GET_ARTISTS = gql`
  query artistList {
    artists {
      id
      name
    }
  }
`;

const GET_ARTIST_WITH_SONGS = gql`
  query artistWithSongs($artistId: ID!) {
    artist(id: $artistId) {
      songs {
        id
        name
      }
    }
  }
`;

class App extends Component {
  
  state = {};
  
  showSongsForArtist = artistId => {
    this.setState({ artistId });
  };
  
  render() {
    const { artistId } = this.state;

    return (
      <Fragment>
        <Query query={GET_ARTISTS}>
          {({ data, loading }) => {
            if (loading) return 'Loading...';
            return (
              <ul>
                {data.artists.map(({id, name}) =>
                  <li onClick={() => this.showSongsForArtist(id)} key={id}>{name}</li>)
                }
              </ul>
            );
          }}
        </Query>
        <hr/>
        {artistId && (
          <Query query={GET_ARTIST_WITH_SONGS} variables={{ artistId }}>
            {({ data, loading }) => {
              if (loading) return 'Loading...';
              return (
                <Fragment>
                  Songs:
                  <ul>
                    {data.artist.songs.map(({id, name}) =>
                      <li key={id}>{name}</li>)
                    }
                  </ul>
                </Fragment>
              );
            }}
          </Query>
        )}
      </Fragment>
    );
  }
}

export default App;
