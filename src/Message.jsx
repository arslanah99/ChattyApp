import React, {Component} from 'react';


class Message extends Component {
  render() {
    return (
      <div className="message">
    <span className="message-username">{this.props.ObjectMessage.username}</span>
    <span className="message-content">{this.props.ObjectMessage.content}</span>
  </div>
    );
  }
}

class Notification extends Component {
  render () {
    return (
      <div className="message system">
      Anonymous1 changed their name to nomnom.
      </div>
    )
  }
}
export default Message;
