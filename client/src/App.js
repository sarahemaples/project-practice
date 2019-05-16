import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import './App.css';

class App extends React.Component{

  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:758e334a-5a1d-4660-8590-24de4fb4637f',
      userId: "sarah",
      tokenProvider: new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/758e334a-5a1d-4660-8590-24de4fb4637f/token"
      })
    });

    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: '19422811',
        hooks: {
          onNewMessage: message => {
            console.log('message.text: ', message.text);
          }
        }
      })
    })

  }
  render() {
    return (
      <div className="App">
          <MessageList />
      </div>
    )
  }

}

export default App;
