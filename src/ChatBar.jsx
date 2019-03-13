import React, {Component} from 'react';
import { timingSafeEqual } from 'crypto';


class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
  <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser.name}/>
  <input className="chatbar-messages" placeholder="Type a message and hit ENTER" onChange={this.props.handleChange} onKeyPress={this.props.keyPress} value={this.props.value}/>
</footer>
    );
  }
}
export default ChatBar;
