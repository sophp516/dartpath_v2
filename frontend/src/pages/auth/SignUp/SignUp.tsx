import React, { useState } from "react"

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('')

    return (
        <div>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input type="password" value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)}></input>
        </div>
    )
}

export default SignUp;
