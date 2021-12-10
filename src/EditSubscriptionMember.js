import React, { useState } from 'react';
import utilsForUsers from './utilsForUsers';

const EditSubscriptionMember = (props) => {

    const [nameToUpdate , setNameToUpdate ] = useState(props.match.params.name)
    const [emailToUpdate , setEmailToUpdate ] = useState(props.match.params.email)
    const [cityToUpdate , setCityToUpdate ] = useState(props.match.params.city)

    const updateMember1 = async (e) => {
        e.preventDefault()
        let newObj = {
            id:props.match.params.id,
            name: nameToUpdate,
            email: emailToUpdate,
            city: cityToUpdate
        }
        await utilsForUsers.updateMember(newObj,props.match.params._id)

        props.history.push('/MainPage/Subscriptions')
    }

    const cancel = () => {
        props.history.goBack()
    }

    return (
        <div>
             <h5>Edit {props.match.params.name} details </h5>
             <form onSubmit={updateMember1}>
                Name: <input type="text" placeholder={props.match.params.name} onChange={e => setNameToUpdate(e.target.value)} />
                Email: <input type="text" placeholder={props.match.params.email} onChange={e => setEmailToUpdate(e.target.value)} />
                City: <input type="text" placeholder={props.match.params.city} onChange={e => setCityToUpdate(e.target.value)} /><br/><br/> 
                <input type="submit" value="Update"/>
                <input type="button" value="Cancle" onClick={cancel}/>
            </form>
        </div>
    );
};

export default EditSubscriptionMember;