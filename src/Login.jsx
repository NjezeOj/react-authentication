import React, {useState} from 'react'; 

 const Login = () => {

    let [data, setData] = useState({
        email: '',
        password: ''
    });

    let { email, password } = data

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitData = () => {
        console.log(data)
    }

    return(
        <div>
            <h1>Login Page</h1>
            <label>E-mail</label>
            <br />
            <input onChange={(e) => onChange(e)} value={email} name="email" type="email" />
            <br />
            <label>Password</label>
            <br />
            <input onChange={(e) => onChange(e)} value={password} name="password" type="password" />
            <br />
            <button onClick={() => submitData()}>
                Submit
      </button>
        </div>
    )
}

export default Login;