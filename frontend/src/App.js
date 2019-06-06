import React, { Component } from 'react';
import styled from 'styled-components';
import { MapContainer } from './Map';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 0 auto;
  align-items: center;
  overflow: visible;
`;
const Input = styled.input`
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  background: white;
  font-size: 22px;
  padding: 5px;
  color: black;
  transition: 0.2s all ease-in;

  &:focus {
    border: 1px solid #00aced;
    transition: 0.2s all ease-in;
  }
`;
const Cards = styled.div`
  margin-top: 20px;
  width: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 1.5rem;
`;
const Card = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Username = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bold;
  transition: 0.2s all ease-in;
  display: inline;

  &:hover {
    color: #1dcaff;
    font-size: 18px;
    transition: 0.2s all ease-in;
  }
`;

class App extends Component {
  state = {
    tweets: [],
  };

  onChange = event =>
    fetch(
      `http://localhost:8000/?text=${encodeURIComponent(event.target.value)}`
    )
      .then(res => res.json())
      .then(tweets =>
        tweets.map(tweet => ({
          id: tweet._id,
          score: tweet._score,
          ...tweet._source,
        }))
      )
      .then(tweets => this.setState({ tweets }));

  render() {
    return (
      <>
      <Container>
        <h1>ornithology</h1>
        <Input type="text" onChange={this.onChange} autoFocus />
        <Cards>
          {this.state.tweets.map(tweet => (
            <Card key={tweet.id}>
              <Username
                href={`https://twitter.com/intent/user?user_id=${
                  tweet.user_id
                }`}
                target="_blank"
              >
                {tweet.username}
              </Username>
              <p>{tweet.text}</p>
              <small>{tweet.score.toFixed(2)}</small>
            </Card>
          ))}
        </Cards>
        
      </Container>
      <MapContainer
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtD3mBC2qK_WKurOSTDxcmYcTlpgdGVwM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </>
    );
  }
}

export default App;
