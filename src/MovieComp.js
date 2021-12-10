import React from 'react';
import { useHistory } from 'react-router-dom';
import utilsForUsers from './utilsForUsers';
import './MainPage.css'


const MovieComp = (props) => {
    const history = useHistory()

    const editMovie = () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "Update Movie")

        if (tempCheackPre.length > 0) {
            localStorage.setItem('movieObjStore',JSON.stringify(props.movie));
            history.push({
                pathname: `/MainPage/EditMovie`
            })
        }
        else{
            alert("you dont have the right permission to edit movies")
        }
    }

    const deleteMovie = async () => {
        var userForMain = JSON.parse(localStorage.getItem('userForMain'));
        let tempCheackPre = userForMain[2].permissions.filter(pre => pre === "Delete Movies")
        if (tempCheackPre.length > 0) {
           await utilsForUsers.deleteMovie(props.movie._id)
           history.push({
            pathname: `/MainPage/Movies`
            })
            window.location.reload()
        }
        else{
            alert("you dont have the right permission to delete movies")
        }
    }

    return (
        <div>
            <div className={"background"}>
            <h5>{props.movie.name}</h5> 
            Date: {props.movie.premiered}<br/><br/>
            Genres: {props.movie.genres.map((item,index) => {
                return <li key={index}>{item}</li>
            })}
            <img src= {props.movie.image} alt=""/><br/>

            <input type="button" value="Edit" onClick={editMovie}/>
            <input type="button" value="Delete" onClick={deleteMovie}/><br/><br/>
            </div>
        </div>
    );
};

export default MovieComp;