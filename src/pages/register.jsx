import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Register = () => {
    
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()

        const res = await axios.post("https://social-media-app-backend-09ei.onrender.com/api/auth/register", {
            name,
            email,
            password
        },{withCredentials : true})

        navigate("/login")
    }

    return (
    <div className="auth-container">
        <h2>Register</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit" onClick={handleSubmit}>Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
    </div>
)
}

export default Register