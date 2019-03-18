import React, { Component } from 'react';
import Message from './Message.jsx';

// const userItems = this.props.messages.username;
class MessageList extends Component {
  //loops through messages and sends the data to message file
  render() {
    const listItems = this.props.messages.map(listItem => {
      return (
        <Message
          ObjectMessage={listItem}
          key={listItem.id}
          newMessages={this.props.newMessage}
        />
      );
    });
    return <main className='messages'>{listItems}</main>;
  }
}
export default MessageList;
