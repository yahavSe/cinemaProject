import React, { useState } from 'react';
import utilsForUsers from './utilsForUsers';
import { useHistory } from 'react-router-dom';

const EditUser = (props) => {
    const [userData] = useState(JSON.parse(localStorage.getItem('userForEdit')))

    const history = useHistory()
    const [newUserName, setUserName] = useState("")
    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [newSessionTimeOut, setSessionTimeOut] = useState("")

    const [exsistPermissonsList] = useState(userData[2].permissions)
    const [newPermissonsList, setp] = useState(exsistPermissonsList)

    const [PermissonsList] = useState([
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscription",
        "View Movies",
        "Create Movies",
        "Delete Movies",
        "Update Movie"])

    const setPermissonsFunc = (e, str) => {
        let arr = exsistPermissonsList
        let index = arr.indexOf(str)
        e.target.checked === true ? arr.push(str) : arr.splice(index, 1)
        setp(arr)
    }

    const putNewData = async () => {

        let obj = [
            {
                userName: newUserName === "" ? userData[0].userName : newUserName,
                password: userData[0].password
            },
            {
                FirstName: newFirstName === "" ? userData[1].FirstName : newFirstName,
                LastName: newLastName === "" ? userData[1].LastName : newLastName,
                CreatedDate: userData[1].CreatedDate,
                sessionTimeOut: newSessionTimeOut === "" ? userData[1].SessionTimeOut : newSessionTimeOut
            },
            {
                permissions: newPermissonsList !== exsistPermissonsList ? newPermissonsList : exsistPermissonsList
            }
        ]

        await utilsForUsers.updateUser(obj, userData[0]._id)
        localStorage.removeItem('userForEdit')
        props.history.push({
            pathname: `/MainPage/UsersManagement`
        })
        
        window.location.reload()
    }
    function goBack() {
        localStorage.removeItem('userForEdit')
        history.go(-2);
    }

    const cancleFunc = () => {
        goBack()
    }  
    return (
        <div>
            <h3>Edit User: {userData[0].userName}</h3>
            <form onSubmit={putNewData}>
                User Name: <input type="text" placeholder={userData[0].userName} onChange={e => setUserName(e.target.value)} /> <br />
                First Name: <input type="text" placeholder={userData[1].FirstName} onChange={e => setFirstName(e.target.value)} /><br />
                Last Name: <input type="text" placeholder={userData[1].LastName} onChange={e => setLastName(e.target.value)} /><br />
                Created Date: <input type="text" value={userData[1].CreatedDate} readOnly /><br />
                Session Time Out: <input type="number" placeholder={userData[1].SessionTimeOut} onChange={e => setSessionTimeOut(e.target.value)} /><br />
                Permissons: {PermissonsList.map((item, index) => {
                    return (
                        <ul key={index} ><label ><input type="checkbox" defaultChecked={exsistPermissonsList.includes(item)} onChange={(e) => setPermissonsFunc(e, item)} />{item}</label></ul>
                    )
                })}
                <input type="submit" value="Update" />
                <input type="button" value="Cancle" onClick={cancleFunc}/>
            </form>

        </div>
    );
};

export default EditUser;