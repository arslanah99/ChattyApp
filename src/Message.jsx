import React, { Component } from 'react';

//grabs props from object message with the username and the content
class Message extends Component {
  render() {
    return (
      <div className='message'>
        <span className='message-username'>
          {this.props.ObjectMessage.username}
        </span>
        <span className='message-content' dangerouslySetInnerHTML={{__html: this.props.ObjectMessage.content}}>
        </span>
      </div>
    );
  }
}

export default Message;
