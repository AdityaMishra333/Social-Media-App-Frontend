import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

const CreatePost = () => {
    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("text", text)
        if(image) formData.append("image", image)

        await axios.post("https://social-media-app-backend-09ei.onrender.com/api/posts", formData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})
        navigate("/")
    }

    return (
    <div className="create-container">
        <h2>Create Post</h2>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleSubmit}>Post</button>
    </div>
)
}

export default CreatePost
