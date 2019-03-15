const uuidv1 = require("uuid/v1");
import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    //responsible for binding
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state = {
      //responsible to give the name when page loads anonymous
      currentUser: { name: "Anonymous" },
      messages: [],
      value: "",
      counter: 0
    };
  }

  //handles postnotification type to show old user changed their name
  handleNameChange(ef) {
    if (ef.key === "Enter") {
      const newName = ef.target.value;
      const { currentUser } = this.state;

      let newNotification = {
        type: "postNotification",
        content: `${currentUser.name} changed their name to ${newName}`,
        username: newName,
        id: uuidv1()
      };
      this.socket.send(JSON.stringify(newNotification));
      currentUser.name = newName;
    }
  }

  componentDidMount() {
    //creates new websocket to connect to server
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => console.log("connected to server");
    this.socket.onmessage = event => {
      let storeUserData = JSON.parse(event.data);
      //switch statements allow for server items to be connected to app jsx
      switch (storeUserData.type) {
        //responsible for how many people are using the website
        case "UserCounter":
          this.setState({ counter: storeUserData.userCount });
          break;
        //responsible for message incoming from server
        case "incomingMessage":
          this.setState({ curData: storeUserData.newMesage });
          console.log(this.setState({ curData: storeUserData.newMesage }));
        //posts message to the DOM
        case "postNotification":
          this.setState({ newMesage: storeUserData });
          break;
        default:
          //show an error in the console if the message type in unknown
          throw new Error("Unknown event type " + storeUserData.type);
      }
      let curData = this.state.messages;
      curData.push(storeUserData);
      this.setState({ messages: curData });
    };
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  //checks when someone hits enter and posts the input from the input text box to the dom
  keyPress(e) {
    if (e.key == "Enter") {
      let newMesage = {
        type: "incomingMessage",
        content: e.target.value,
        username: this.state.currentUser.name,
        id: uuidv1()
      };
      this.socket.send(JSON.stringify(newMesage));
    }
  }
  //renders items to dom from different files in src folder
  render() {
    return (
      <div>
        <a className="navbar-brand-name">{this.state.counter} users online</a>
        <ChatBar
          currentUser={this.state.currentUser}
          keyPress={this.keyPress}
          handleChange={this.handleChange}
          value={this.state.value}
          handleNameChange={this.handleNameChange}
        />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
