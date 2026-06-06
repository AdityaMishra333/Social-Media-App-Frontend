import { useState, useEffect } from "react"
import axios from "axios"
import PostCard from "../components/postcard"
import { useNavigate } from "react-router-dom"

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

const Feed = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    const fetchPosts = () => {
        axios.get("http://localhost:3000/api/posts", getAuthHeader())
            .then(res => setPosts(res.data))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div>
            <nav>
                <h2>Social</h2>
                <div>
                    <button onClick={() => navigate('/create')}>+ Create Post</button>
                    <button onClick={() => {
                        localStorage.removeItem('token')
                        navigate('/login')
                    }}>Logout</button>
                </div>
            </nav>
            <div className="feed-container">
                {posts.map(post => (
                    <PostCard key={post._id} post={post} onUpdate={fetchPosts} />
                ))}
            </div>
        </div>
    )
}

export default Feed