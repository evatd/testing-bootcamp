import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  receiveConversation
} from '../../../actions/conversation'
import * as api from '../../../api/message'
import Conversation from './Conversation'

class ConversationContainer extends Component {
  componentDidMount() {
    this.fetchConversation(this.props.match.params.username)
  }

  fetchConversation = async (username) => {
    const conversation = await this.props.api.fetchConversation(username)
    this.props.receiveConversation(conversation)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.fetchConversation(nextProps.match.params.username)
    }
  }

  render() {
    const { match, conversation } = this.props
    return (
      <Conversation
        conversation={conversation}
        match={match}
      />
    )
  }
}

ConversationContainer.defaultProps = {
  api
}


ConversationContainer.propTypes = {
  match: PropTypes.object.isRequired,
  conversation: PropTypes.array.isRequired,
  receiveConversation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  conversation: state.conversation
})

const mapStateToDispatch = {
  receiveConversation
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(ConversationContainer))
