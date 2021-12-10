import React, { useState, useEffect } from 'react';
import utilsForUsers from './utilsForUsers';
import { Link, useHistory } from 'react-router-dom';
import './UserMangeComp.css'
import './MainPage.css'


const UserMangeComp = (props) => {
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [userPermissions, setUserPermissions] = useState([])
    const [userFromServerComp,setUserFromServer] = useState([])
    const [showOrNot , setShowOrNot] = useState("showS")
    const history = useHistory()

    useEffect( () => {
        async function getByID() {
            let userFromServer = await utilsForUsers.getById(props.user._id)
            setUser(userFromServer[0])
            setUserData(userFromServer[1])
            setUserPermissions(userFromServer[2].permissions)
            setUserFromServer(userFromServer)
        }
        getByID()
    }, [props.user._id])

    const EditUserFunc = async () => {
        await localStorage.setItem('userForEdit',JSON.stringify(userFromServerComp));
        history.push({
            pathname: `/MainPage/EditUser`,
        })
        setShowOrNot("showN")
    }
    
    const DeleteUser = async () => {
        await utilsForUsers.deleteUser(props.user._id)
        history.push({
            pathname: `/MainPage/`,
        })
    }

    return (
        <div  >
            <div className={showOrNot}>
                <div className="background2" >
                    User Name: {user.userName}<br />
                    First Name: {userData.FirstName}<br/>
                    Last Name: {userData.LastName}<br/>
                    Created Date: {userData.CreatedDate}<br/>
                    Session Time Out: {userData.CreatedDate}<br/>
                    permissions: {userPermissions.map((item,index)=>{
                        return <li key={index}>{item}</li>
                    })}<br/><br/>
                    <button onClick={EditUserFunc}><Link to={`/MainPage/EditUser`}>Edit User</Link></button>
                    <input type="button" value="Delete" onClick={DeleteUser}/><br/><br/>
                </div>
            </div>
        </div>
    );
};

export default UserMangeComp;