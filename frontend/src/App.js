import React, { Component } from 'react';
import styled from 'styled-components';

const toQueryString = params =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 0 auto;
  align-items: center;
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

  onChange = event => {
    const text = event.target.value;
    const hashtags = text.split(' ').filter(word => word[0] === '#');
    const usernames = text.split(' ').filter(word => word[0] === '@');

    fetch(
      `http://localhost:8000/?${toQueryString({
        text,
        hashtags,
        usernames,
      })}`
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
  };

  render() {
    console.log(this.state.tweets);
    return (
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
    );
  }
}

export default App;
