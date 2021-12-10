import React, { useState } from 'react';
import utilsForUsers from './utilsForUsers';

const AddMember = (props) => {
    const [nameToAdd , setNameToAdd ] = useState("")
    const [emailToAdd , setEmailToAdd ] = useState("")
    const [cityToAdd , setCityToAdd ] = useState("")

    const cancel = () => {
        props.history.goBack()
    }

    const AddMemberNew = async (e) => {
        e.preventDefault()
        let id = props.members.length + 1
        let memberObj = {
            id: id,
            name: nameToAdd,
            email: emailToAdd,
            city: cityToAdd
        }
        await utilsForUsers.addMember(memberObj)
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={AddMemberNew}>
                Name: <input type="text" onChange={e => setNameToAdd(e.target.value)} required /><br/>
                Email: <input type="text" onChange={e => setEmailToAdd(e.target.value)} required/><br/>
                 City:   <input type="text" onChange={e => setCityToAdd(e.target.value)} required/><br/>
                <input type="submit" value="Add"/>
                <input type="button" value="Cancle" onClick={cancel}/>
            </form>
        </div>
    );
};

export default AddMember;