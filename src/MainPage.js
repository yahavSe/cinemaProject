import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import Movies from './Movies';
import Subscriptions from './Subscriptions';
import UsersManagement from './UsersManagement';
import EditUser from './EditUser';
import EditMovie from './EditMovie';
import AddMovie from './AddMovie';
import MoviesFromLink from './MoviesFromLink';
import EditSubscriptionMember from './EditSubscriptionMember';


import './MainPage.css'
import './background.css'



const MainPage = (props) => {
    const history = useHistory()
    let [movieChecked, setMovieChecked] = useState("false")
    let [subscriptionsChecked, setSubscriptionsChecked] = useState("false")
    let [usersManagementChecked, setUsersManagementChecked] = useState("false")
    let [display, setDisplay] = useState("dispN")

    const moviesComp = (e) => {
        if (movieChecked === "false") {
            setMovieChecked("true")

            history.push({
                pathname: `/MainPage/Movies`,
            })
        }

        else {
            history.push({
                pathname: `/MainPage/`,
            })
            setMovieChecked("false")
        }
    }

    const subscriptionsComp = () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "View Subscriptions")
        if (tempCheackPre.length > 0 ) {
            if (subscriptionsChecked === "false") {
                setSubscriptionsChecked("true")
    
                history.push({
                    pathname: `/MainPage/Subscriptions`,
                })
            }
            else {
                history.push({
                    pathname: `/MainPage/`,
                })
                setSubscriptionsChecked("false")
            }
        }
        else{
            alert("you dont have the right permission to view member's data")
        }

    }

    const usersManagementComp = () => {
        if (usersManagementChecked === "false") {
            setUsersManagementChecked("true")

            history.push({
                pathname: `/MainPage/UsersManagement`,
            })
        }
        else {
            history.push({
                pathname: `/MainPage/`,
            })

            setUsersManagementChecked("false")
        }
    }
    const usersLogOut = () => {
        localStorage.clear('userForMain')
        localStorage.clear('usersForMain')
        localStorage.clear('userForEdit')
        localStorage.clear('members')
    }

    useEffect(() => {
        if ( JSON.parse(localStorage.getItem('userForMain'))[0].userName === "yahav") {
            setDisplay("dispS")
        }
        else {
            setDisplay("dispN")
        }
    }, [])



    return (


        <div className={"grad"}>
            <h2 className={"h1"}>Main</h2>
            <h3>Hello {JSON.parse(localStorage.getItem('userForMain'))[0].userName }</h3>

            <ul className={"flex"}>
                <ol><button onClick={moviesComp}><Link to={`/MainPage/Movies`}>Movies</Link></button></ol>
                <ol><button onClick={subscriptionsComp}><Link to={`/MainPage/Subscriptions`}>Subscriptions</Link></button></ol>
                <ol><button className={display} onClick={usersManagementComp}><Link to={`/MainPage/UsersManagement`}>Users Management</Link></button></ol>
                <ol><button  onClick={usersLogOut}><Link to={`/`}>Log Out</Link></button></ol>
            </ul>

            <Switch>
                <Route path="/MainPage/Movies/" component={Movies} />
                <Route path="/MainPage/Subscriptions" component={Subscriptions} />
                <Route path="/MainPage/Subscription/EditSubscription/:id/:name/:email/:city/:_id" exact component={EditSubscriptionMember} />
                <Route path="/MainPage/UsersManagement" component={UsersManagement} />
                <Route path="/MainPage/EditUser" component={EditUser} />
                <Route path="/MainPage/EditMovie" component={EditMovie} />
                <Route path="/MainPage/AddMovie" component={AddMovie} />
                <Route path="/MainPage/:name" exect  component={MoviesFromLink} />
            </Switch>

        </div>
    );
};

export default MainPage;