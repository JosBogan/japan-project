import React from 'react'


const CommentForm = ({ cancelComment, handleChange, handleSubmit, commentData }) => {

  return (
    <>
    <div
      onClick={cancelComment} 
      className="comment_container"
    >
    </div>
    <form 
      className="comment_form"
      onSubmit={() => handleSubmit(commentData._id)}  
    >
      <h1 className="comment_header">Comment</h1>
      <div>
        <label>Title</label>
        <input 
          name="title"
          value={commentData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Comment</label>
        <textarea 
          name="text"
          value={commentData.text}
          onChange={handleChange}
        />
      </div>
      <div className="comment_buttons">
        <button
          onClick={cancelComment} 
        >Cancel</button>
        <button 
          type="submit"
        >Submit</button>
      </div>
    </form>
    </>
  )
}

export default CommentForm