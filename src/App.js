import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: "WhatIsYourUsernameScreen",
      currentUsername: ""
    }
    this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(res => {
        console.log('success');
        console.log(username);
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen',
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    if (this.state.currentScreen === "WhatIsYourUsernameScreen") {
      return <UsernameForm onSubmit={this.onUsernameSubmitted}></UsernameForm>
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
  }
}

export default App
