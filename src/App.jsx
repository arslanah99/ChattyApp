import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import generateRandomId from './generateRandomId.js'

class App extends Component {
  
  

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state = {
      
        currentUser: {name: 'Steve'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            username: 'Bob',
            content: 'Has anyone seen my marbles?',
            id: 10294
          },
          {
            username: 'Anonymous',
            content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
            id: 21934
          }
        ],
        value:''
      }
    }



  
  // in App.jsx
componentDidMount() {
  console.log('componentDidMount <App />');
  setTimeout(() => {
    console.log('Simulating incoming message');
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);

}
handleChange(e) {
  this.setState({value: e.target.value});
  }
keyPress(e){
  if(e.key == 'Enter'){
    console.log(e.target.value)
    let newMesages = {
      'type': 'incomingMessage',
      'content': e.target.value,
      'username': this.state.currentUser.name,
      'id': generateRandomId()
    }
    let curData = this.state.messages;
    curData.push(newMesages);
    this.setState({messages: curData})
    }
  }
  // newMessage(e) {
  //   console.log('fdsauifodsajfok')
  //   if (e.key == 'Enter'){

  //   }
  // }

  render() {
    return (
    <div>
    {/* <Message />, */}
    <ChatBar currentUser={this.state.currentUser} keyPress={this.keyPress} handleChange={this.handleChange} value={this.state.value} />,
    <MessageList messages={this.state.messages}/>
    </div>
      );
  }
}

export default App;
