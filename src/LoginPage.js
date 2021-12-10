import React, { useEffect, useState } from 'react';
import utilsForUsers from './utilsForUsers';
import './background.css'
import { useHistory } from 'react-router-dom';

const LoginPage = (props) => {

    const history = useHistory()
    const [users, setUsers] = useState()
    const [userInfo, setUserInfo] = useState({ userName: "", password: "" })

    useEffect( () => {
        async function userss() {
            let userss = await utilsForUsers.getALL()
            setUsers(userss)
            localStorage.setItem('usersForMain',JSON.stringify(userss));
        }
        userss()
    }, [])

    const Login = async (e) => {
        e.preventDefault()
        let userObj = []

        userObj = users.filter((item) => {
            if ((item.userName === userInfo.userName) && (item.password === userInfo.password)) {
                if (userInfo.password === "") {
                    alert("please creat an account with new password")
                }
                else{
                return item
                }
            }  
        return null
        })

        if (userObj.length > 0) {
            let allUserData = await utilsForUsers.getById(userObj[0]._id)
            localStorage.setItem('userForMain',JSON.stringify(allUserData));

            history.push({
                pathname: `/MainPage/`
                })
        }
        else {
            alert("User doesn't exist")
        }
    }

    const creatUser = () => {
        history.push({
            pathname: `/CreateUser/`,

        })
    }
    return (
        <div className="grad">
            <h2>Login</h2>
            <form onSubmit={Login}>
                userName: <input type="text" onChange={(e) => setUserInfo({ ...userInfo, userName: e.target.value })} /> <br />
                password: <input type="text" onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} /> <br /><br />
                <input type="submit" value="Login" />
                <input type="button" value="Create User" onClick={creatUser} />
            </form>

        </div>
    );
};

export default LoginPage;