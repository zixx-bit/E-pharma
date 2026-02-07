'use client';
import React from 'react'

type FormData ={
    email: string;
    password: string;
}
const Login= () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ServerError, setServerError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);
  return (
    <div> Login page</div>
  )
}

export default Login;