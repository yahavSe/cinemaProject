import React, { useState } from 'react';
import utilsForUsers from './utilsForUsers';
import { useHistory } from 'react-router-dom';

const AddUser = () => {
    const [newUserName, setUserName] = useState("")
    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState("")
    const [createdDate,setCreatedDate] = useState("")
    const [newSessionTimeOut, setSessionTimeOut] = useState("")
    const [newPermissonsList, setp] = useState([])
    const [temp] = useState([])
    const [PermissonsList] = useState([
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscription",
        "View Movies",
        "Create Movies",
        "Delete Movies",
        "Update Movie"])

    const history = useHistory()

    const setPermissonsFunc = (e, str) => {
        let index = temp.indexOf(str)    
        e.target.checked === true ? temp.push(str) : temp.splice(index, 1)
        setp(temp)
    }

    const putNewData = () => {

        async function put() {
            
        let obj = [
            {
                userName: newUserName,
                password: ""
            },
            {
                FirstName: newFirstName,
                LastName: newLastName,
                CreatedDate: createdDate,
                sessionTimeOut: newSessionTimeOut
            },
            {
                permissions: newPermissonsList
            }
        ]
        await utilsForUsers.addUser(obj)
        }
        put()
        history.push({
            pathname: `/MainPage/UsersManagement`
        })
    }
    function goBack() {
        history.go(-2);
    }

    const cancleFunc = () => {
        goBack(-1)
    }

    return (
        <div>
            <h4>Add User</h4>
            <form onSubmit={putNewData}>
                User Name: <input type="text"  onChange={e => setUserName(e.target.value)} /> <br />
                First Name: <input type="text"  onChange={e => setFirstName(e.target.value)} /><br />
                Last Name: <input type="text" onChange={e => setLastName(e.target.value)} /><br />
                Created Date: <input type="text"  onChange={e => setCreatedDate(e.target.value)} /><br />
                Session Time Out: <input type="number"  onChange={e => setSessionTimeOut(e.target.value)} /><br />
                Permissons: {PermissonsList.map((item, index) => {
                    return (
                        <ul key={index} ><label ><input type="checkbox" onChange={(e ) => setPermissonsFunc(e, item)} />{item}</label></ul>
                    )
                })}
                <input type="submit" value="Update" />
                <input type="button" value="Cancle" onClick={cancleFunc}/>

            </form>
            
        </div>
    );
};

export default AddUser;