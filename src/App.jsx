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
        value:'',
        counter: 0
      }
    }

handleNameChange(ef) {
  if (ef.key === 'Enter') {


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

    switch(storeUserData.type){
      case 'UserCounter':
      // handle incoming message
      this.setState({counter: storeUserData.userCount})
        break;
      case 'incomingMessage':
      this.setState({curData: storeUserData.newMesage})
      console.log(this.setState({curData: storeUserData.newMesage.userCounter})
      )
      break;
      default:
        //show an error in the console if the message type in unknown
        throw new Error('Unknown event type ' + storeUserData.type);
    }
    let curData = this.state.messages;
    curData.push(storeUserData);
    this.setState({messages: curData})
  }



  setTimeout(() => {
    console.log('Simulating incoming message');
    const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    const messages = this.state.messages.concat(newMessage)
    
    this.setState({messages: messages})
  }, 3000);

}
handleChange(e) {
  this.setState({value: e.target.value});
  }
keyPress(e){
  if(e.key == 'Enter'){
    let newMesage = {
      type: 'incomingMessage',
      content: e.target.value,
      username: this.state.currentUser.name,
      id: uuidv1()
    }
    this.socket.send(JSON.stringify(newMesage))
    }
  }


  render() {
    return (
    <div>
    <a className="navbar-brand-name">Current Users Online:{this.state.counter}</a>
    <ChatBar currentUser={this.state.currentUser} keyPress={this.keyPress} handleChange={this.handleChange} value={this.state.value} handleNameChange={this.handleNameChange} />,
    <MessageList messages={this.state.messages}/>
    </div>
      );
  }
}

export default App;
