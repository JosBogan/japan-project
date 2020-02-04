import React from 'react'
import axios from 'axios'

import CommentForm from './comments/CommentForm'
import Comment from './comments/Comment'
import Auth from '../lib/Auth'

const templateCommentData = {
  title: '',
  text: ''
}

class DestinationShow extends React.Component{

  state = {
    destination: null,
    newComment: false,
    editComment: false,
    commentData: {
      title: '',
      text: ''
    }
  }

  getDestinationData = async () => {
    try {
      const res = await axios.get(`/api/destinations/${this.props.match.params.id}`)
      const destination = res.data
      this.setState({ destination })
    } catch (err) {
      this.props.history.push('/notfound')
      console.log(err)
    }
  }

  async componentDidMount() {
    this.getDestinationData()
  }

  newComment = () => {
    this.setState({ newComment: true })
  }

  editComment = (comment) => {
    this.setState({ commentData: comment })
    this.setState({ editComment: true })
  }

  cancelComment = () => {
    this.setState({ newComment: false, editComment: false, commentData: templateCommentData })
  }

  handleChange = () => {
    const commentData = { ...this.state.commentData, [event.target.name]: event.target.value }
    this.setState({ commentData })
  }

  handleSubmit = async () => {
    event.preventDefault()
    try {
      const res = await axios.post(`/api/destinations/${this.props.match.params.id}/comments`, this.state.commentData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const destination = res.data
      this.setState({ destination })
      this.cancelComment()
    } catch (err) {
      console.log(err)
    }
  }

  deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`/api/destinations/${this.props.match.params.id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const destination = res.data
      console.log(res.data)
      this.setState({ destination })
    } catch (err) {
      console.log(err)
    }
  }

  handleEditComment = async (commentId) => {
    event.preventDefault()
    try {
      const res = await axios.put(`/api/destinations/${this.props.match.params.id}/comments/${commentId}`, this.state.commentData, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const destination = res.data
      this.setState({ destination })
      this.cancelComment()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { destination } = this.state
    return (
      this.state.destination && 
      <section className="body show_container">
        <div>
          <div className="full_image" style={{ backgroundImage: `url(${destination.imageURL})` }}></div>
        </div>
        <div className="show_info_container">
          <h1 className="show_header">{destination.name}</h1>
          <h2 className="show_region">{destination.region}</h2>
          <p className="description">{destination.description}</p>
          {Auth.isAuthenticated() && <button 
            className="comment_button"
            onClick={this.newComment}
          >Comment</button>
          }
          {this.state.newComment && 
            <CommentForm
              cancelComment={this.cancelComment}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              commentData={this.state.commentData}
            />}
          {this.state.editComment && 
            <CommentForm
              cancelComment={this.cancelComment}
              handleChange={this.handleChange}
              handleSubmit={this.handleEditComment}
              commentData={this.state.commentData}
            />}
          <div className="comment_list">
            {destination.comments && destination.comments.map(comment => (
              <Comment 
                key={comment._id}
                comment={comment}
                deleteComment={this.deleteComment}
                editComment={this.editComment}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default DestinationShow 