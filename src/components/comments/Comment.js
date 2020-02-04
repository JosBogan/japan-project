import React from 'react'

import Auth from '../../lib/Auth'

const Comment = ({ comment, deleteComment, editComment }) => (
  <div className="comment_box">
    <h3>{comment.title}</h3>
    <p className="comment_username">{comment.user.username} - {new Date(comment.createdAt).toLocaleString()}</p>
    <p>{comment.text}</p>
    {Auth.isAuthenticated() &&
                Auth.isOwner(comment.user._id) &&
                <div className="comment_edit_buttons">
                  <button onClick={() => deleteComment(comment._id)}>Delete</button>
                  <button onClick={() => editComment(comment)}>Edit</button>
                </div> 
    }    
  </div>
)

export default Comment