import React, {
    useState
} from 'react';
import { connect } from 'react-redux';
import {registerUser} from './action/auth';
import {Redirect} from 'react-router-dom';


//he is using useEffect that is why he is using functions

const Register = ({isLoggedIn, registerUser}) => {

    let [data, setData] = useState({
        email: '',
        password: '',
        
    });

    let { email, password } = data

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitData = () => {
        
        if(email === '' && password === '') return alert('Empty values')
        else registerUser(email, password);
         
        console.log(data)
    }

    if (isLoggedIn)
        return <Redirect to="/" />

    return (
        <div>
            <h1>Register Page</h1>
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
    );
}
//mapStateToProps is the value of teh reducer

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {registerUser})(Register);
