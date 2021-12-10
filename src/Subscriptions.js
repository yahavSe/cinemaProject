import React, { useState , useEffect } from 'react';
import AddMember from './AddMember';
import MemberComp from './MemberComp';
import utilsForUsers from './utilsForUsers';
import './MainPage.css'

const Subscriptions = () => {
    const [ membersList , setMembersList ] = useState()
    const [ membersListShow , setMembersListShow ] = useState("false") 
    const [addMemberShow , setAddMemberShow ] = useState("false")
    const [ membersTemp , setmembersTemp] = useState()
    const [ subTemp , setsubTemp] = useState()
    const [ movies , setMovies] = useState()

    useEffect(() => {
        async function getMovies() {
            var movies = await utilsForUsers.getALLMovies()
            var subTemp = await utilsForUsers.getALLSubscriptions()
            var membersTemp = await utilsForUsers.getALLMembers()
            await setmembersTemp(membersTemp)
            await setsubTemp(subTemp)
            await setMovies(movies)
        }
        getMovies()
    },[])

    const getMembers = async () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "View Subscriptions")

        if (tempCheackPre.length > 0) {
            if (membersListShow === "false") {
                if (addMemberShow === "true") {
                    setAddMemberShow("false")
                }
                localStorage.setItem('members',JSON.stringify(membersTemp));
                var tempList = membersTemp.map((member , index) => {
                    var subTempToComp = subTemp.filter(sub => sub.id === member._id)
                    return <MemberComp  key={index} member={member} subscription={subTempToComp} movies={movies}/>
                })
                    
                setMembersList(tempList)
                setMembersListShow("true")
            }
            else {
                setMembersListShow("false")
            }
        }
        else{
            alert("you dont have the right permission to view the subscriptions")
        }
    }

    const addMember = () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "Create Subscriptions")

        if (tempCheackPre.length > 0) {
            if (addMemberShow === "false") {
                if (membersListShow === "true") {
                    setMembersListShow("false")
                }
                setAddMemberShow("true")
            } else {
                setAddMemberShow("false")
            }
        }
        else{
            alert("you dont have the right permission to add a new subscription")
        }
    }

    return (
        <div>
            <h4>Subscriptions</h4>
            <input type="button" value="All Member's" onClick={getMembers} />
            <input type="button" value="Add Member" onClick={addMember} /><br/><br/>
            <div className="tbl">
                {membersListShow === "true" ? membersList : ""}<br/><br/>
            </div>
            {addMemberShow === "true" ? <AddMember members={membersTemp}/> : ""}

        </div>
    );
};

export default Subscriptions;