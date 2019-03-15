const uuidv1 = require('uuid/v1')
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import generateRandomId from './generateRandomId.js'

class App extends Component {
  

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state = {
      
        currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],
        value:''
      }
    }

handleNameChange(ef) {
  if (ef.key === 'Enter') {
    // const oldName = this.state.currentUser;
    // const newNames = this.setState({ currentUser: ef.target.value, type:'postMessagez'});
    // this.state.currentUser

    const newName = ef.target.value;
    const {currentUser} = this.state
   
    let newNotification = {
      'type': 'postNotification',
      'content': `${currentUser.name} changed their name to ${newName}`,
      'username': newName,
      'id': uuidv1()
    }
    this.socket.send(JSON.stringify(newNotification))
      currentUser.name = newName
    }
  }
  
    

  
  // in App.jsx
componentDidMount() {
  console.log('componentDidMount <App />');

  this.socket = new WebSocket("ws://localhost:3001/");
  this.socket.onopen = () => console.log("connected to server");
  this.socket.onmessage = (event) => {
    console.log(event.data)
    let storeUserData = JSON.parse(event.data)
    // console.log(storeUserData.username)
    // console.log(this.state)
    // switch(storeUserData.type){
    //   case 'incomingMessage':
    //   // handle incoming message

    //     break;
    //   case 'incomingNotification':
    //   //handle incoming notification
    //     break;
    //   default:
    //     //show an error in the console if the message type in unknown
    //     throw new Error('Unknown event type ' + storeUserData.type);
    // }
    let curData = this.state.messages;
    curData.push(storeUserData);
    this.setState({messages: curData})
  }
  //mathod save the old username that is found in state
  //define a var that you use to save the old username
  //if logic
  //craete a new var object that contains the an object including the type old username and new username
  //send the notification variable to the server
  //adn then set state3 of new user and that the function
  //


  // function sendText() {

  //   var msg = {
  //     type: 'Send Message',
  //     content: this.state.messages.content,
  //     username: this.state.currentUser.name

  //   }
  //     socket.send(JSON.stringify(msg))
    
  //   }

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
    // console.log(e.target.value)
    let newMesage = {
      'type': 'incomingMessage',
      'content': e.target.value,
      'username': this.state.currentUser.name,
      'id': uuidv1()
    }
    this.socket.send(JSON.stringify(newMesage))
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
    <ChatBar currentUser={this.state.currentUser} keyPress={this.keyPress} handleChange={this.handleChange} value={this.state.value} handleNameChange={this.handleNameChange} />,
    <MessageList messages={this.state.messages}/>
    </div>
      );
  }
}

export default App;
