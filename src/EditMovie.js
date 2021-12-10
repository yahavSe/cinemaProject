import React, { useState } from 'react';
import utilsForUsers from './utilsForUsers';
import { useHistory } from 'react-router-dom';

const EditMovie = (props) => {
    const history = useHistory()
    const [ movieStore ] = useState(JSON.parse(localStorage.getItem('movieObjStore')))

    const [movieObjNew , setMovieObjNew ] = useState({
        name : movieStore.name,
        genres : movieStore.genres,
        image : movieStore.image,
        premiered : movieStore.premiered
    })

    const updateMovie = async () => {
        utilsForUsers.updateMovie( movieObjNew , movieStore._id )
        localStorage.setItem('movieObjStore',JSON.stringify(movieObjNew));
        history.push({
            pathname: `/MainPage/Movies/`
        })
    }
    const cancel = () => {
        history.goBack()
    }

    return (
        <div>
            <h5>Edit Movie</h5>
            <form onSubmit={updateMovie}>
                Name: <input type="text" placeholder={movieStore.name} onChange={e => setMovieObjNew({ ...movieObjNew, name: e.target.value })}/><br/>
                Genres: <input type="text" placeholder={movieStore.genres} onChange={e => setMovieObjNew({ ...movieObjNew, genres: e.target.value })}/><br/>
                Image Url: <input type="text" placeholder={movieStore.image} onChange={e => setMovieObjNew({ ...movieObjNew, image: e.target.value })}/><br/>
                premiered: <input type="text" placeholder={movieStore.premiered} onChange={e => setMovieObjNew({ ...movieObjNew, premiered: e.target.value })}/><br/>
                <input type="submit" value="Update"/>
                <input type="button" value="Cancel" onClick={cancel}/>
            </form>
        </div>
    );
};

export default EditMovie;