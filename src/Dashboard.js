import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from './action/auth'

const Dashboard = ({isLoggedIn, logOut}) => {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <br/>
            <Link to="/register" style={{ display: isLoggedIn ? "none" : "block" }}>Register</Link>
            <br/>
            <Link to="/login" style={{ display: isLoggedIn ? "none" : "block" }}>Login</Link>
            {
                isLoggedIn ? (
                    <div>
                        <h1>You are logged in </h1>      
                        <br/>
                        <button onClick={() => logOut()}>
                            Log Out
                        </button>
                    </div>
                )
                :
                (
                    <div>
                        <h1>You are NOT logged in </h1> 
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {logOut})(Dashboard)