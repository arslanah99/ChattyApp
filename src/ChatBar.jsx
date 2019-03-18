import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className='chatbar'>
        <input
          className='chatbar-username'
          placeholder='Your Name (Optional)'
          defaultValue={this.props.currentUser.name}
          onKeyUp={this.props.handleNameChange}
        />
        <input
          className='chatbar-messages'
          placeholder='Type a message and hit ENTER'
          onChange={this.props.handleChange}
          onKeyPress={this.props.keyPress}
          
        />
      </footer>
    );
  }
}
export default ChatBar;
