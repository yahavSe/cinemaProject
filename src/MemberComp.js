import React from 'react';
import MemberMovieComp from './MemberMovieComp';
import { useHistory } from 'react-router-dom';
import utilsForUsers from './utilsForUsers';
import './MainPage.css'

const MemberComp = (props) => {
    const history = useHistory()

    const EditSubscriptionMember = () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "Update Subscription")

        if (tempCheackPre.length > 0) {
            history.push({
                pathname: `/MainPage/Subscription/EditSubscription/${props.member.id}/${props.member.name}/${props.member.email}/${props.member.city}/${props.member._id}`
            })
        }
        else{
            alert("you dont have the right permission to edit Subscription")
        }
    }

    const DeleteSubscriptionMember = async () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "Delete Subscriptions")

        if (tempCheackPre.length > 0) {
            await utilsForUsers.deleteMember(props.member._id)
            await utilsForUsers.deleteSubscription(props.subscription[0]._id)
            window.location.reload();
        }
        else{
            alert("you dont have the right permission to delete Subscription")
        }
    }

    return (
        <div className="background2">

            <h5> Name: {props.member.name} </h5>
            Email {props.member.email}<br/>
            City: {props.member.city}<br/><br/>
            <input type="button" value="Update" onClick={EditSubscriptionMember}/>
            <input type="button" value="Delete" onClick={DeleteSubscriptionMember} /><br/><br/>
            <MemberMovieComp member={props.member} subscriptionMovies={props.subscription} movies={props.movies}/>
        </div>
    );
};

export default MemberComp;