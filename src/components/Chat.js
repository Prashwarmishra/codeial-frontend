import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: '',
    };

    this.userEmail = props.user.email;
    this.socket = io.connect('http://54.237.158.65:5000');

    if (this.userEmail) {
      this.setupConnection();
    }
  }

  setupConnection = () => {
    const self = this;

    self.socket.on('connect', function (data) {
      console.log('Connection established successfully!', data);

      self.socket.emit('join_room', {
        user_email: self.userEmail,
        chat_room: 'codeial',
      });

      self.socket.on('user_joined', function (data) {
        console.log('User joined the chat: ', data);
      });
    });

    self.socket.on('message_recieved', function (data) {
      console.log('New message recieved: ', data);
      let messageObject = {};
      messageObject.content = data.message;
      if (self.userEmail === data.user_email) {
        messageObject.self = true;
      }
      const { messages } = self.state;
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { user } = this.props;
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        user_email: user.email,
        message: typedMessage,
        chat_room: 'codeial',
      });
    }
  };

  render() {
    const { typedMessage, messages } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
            alt=""
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            // message.self ? 'chat-bubble self-chat' : 'chat-bubble other-chat'
            <div
              className={`chat-bubble ${
                message.self ? 'self-chat' : 'other-chat'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Chat);
