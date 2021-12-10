import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import utilsForUsers from './utilsForUsers';

const AddMovie = () => {

    const history = useHistory()

    const [movieObjName , setMovieObjName] = useState("")
    const [movieObjGenres , setMovieObjGenres ] = useState([])
    const [movieObjImage , setMovieObjImage ] = useState("")
    const [movieObjPremiered , setMovieObjPremiered ] = useState("")

    const movieName = (e) => {
        setMovieObjName(e.target.value)
    }
    const movieGenres = (e) => {
        let temp = e.target.value.split(',')
        console.log(temp);
        setMovieObjGenres(temp)
    }
    const movieImage = (e) => {
        setMovieObjImage(e.target.value)
    }
    const moviePremiered = (e) => {
        setMovieObjPremiered(e.target.value)
    }

    const updateMovie = async () => {
        let movieObjAdd = {
            name: movieObjName ,
            genres: movieObjGenres,
            image: movieObjImage,
            premiered: movieObjPremiered
        }
        await utilsForUsers.addMovie(movieObjAdd)
        window.location.assign(`/MainPage/Movies/`) 
    }
    const cancel = () => {
        history.goBack()
    }

    return (
        <div>
            <h5>Add Movie</h5>
            <form onSubmit={updateMovie}>
                Name: <input type="text"  onChange={movieName}/><br/>
                Genres: <input type="text"  onChange={e => movieGenres(e)}/><br/>
                Image Url: <input type="text"  onChange={movieImage}/><br/>
                premiered: <input type="text"  onChange={moviePremiered}/><br/>
                <input type="submit" value="Update"/>
                <input type="button" value="Cancel" onClick={cancel}/>
            </form>
        </div>
    );
};

export default AddMovie;