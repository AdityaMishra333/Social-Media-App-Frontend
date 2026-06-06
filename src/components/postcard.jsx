import { useState } from "react"
import axios from "axios"

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

const PostCard = ({ post, onUpdate }) => {
    const [commentText, setCommentText] = useState("")

    const handleLike = async () => {
        await axios.put(`http://localhost:3000/api/posts/${post._id}/like`, {}, getAuthHeader())
        onUpdate()
    }

    const handleComment = async () => {
        if (!commentText) return
        await axios.post(`http://localhost:3000/api/posts/${post._id}/comment`, { text: commentText }, getAuthHeader())
        setCommentText("")
        onUpdate()
    }

    return (
        <div className="post-card">
            <div className="post-author">
                <div className="avatar">{post.author.name[0].toUpperCase()}</div>
                <div className="author-info">
                    <h4>{post.author.name}</h4>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            {post.text && <p className="post-text">{post.text}</p>}
            {post.image && <img className="post-image" src={`http://localhost:3000${post.image}`} alt="post" />}
            <div className="post-actions">
                <button onClick={handleLike}>❤️ {post.likes.length}</button>
                <button>💬 {post.comments.length}</button>
            </div>
            <div className="comment-box">
                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." />
                <button onClick={handleComment}>Post</button>
            </div>
            {post.comments.length > 0 && (
                <div className="comments-list">
                    {post.comments.map((comment, index) => (
                        <div key={index} style={{ padding: '0.3rem 0', borderTop: '0.1rem solid #222', fontSize: '0.85rem' }}>
                            <strong style={{ color: 'orangered' }}>{comment.user?.name || "User"}</strong>
                            <span style={{ marginLeft: '0.5rem', color: '#000000' }}>{comment.text}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PostCard