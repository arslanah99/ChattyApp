import React, {Component} from 'react';
import Message from "./Message.jsx";

// const userItems = this.props.messages.username;
class MessageList extends Component {


  render() {
const listItems = this.props.messages.map((listItem) => {
  return <Message ObjectMessage={listItem} key={listItem.id}/>
})
    return (
      <main className="messages">
        {listItems} 
      </main>
    );
  }
}
export default MessageList;
