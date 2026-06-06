import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()

        const res = await axios.post("https://social-media-app-backend-09ei.onrender.com/api/auth/login", {
            email,
            password
        },{withCredentials : true})
        login(res.data.user)
        localStorage.setItem('token', res.data.token)
        navigate('/')
    }

    return (
    <div className="auth-container">
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit" onClick={handleSubmit}>Login</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
)
}

export default Login