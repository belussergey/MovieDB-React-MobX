import React, {useCallback} from 'react';
import styles from './Favorite.module.scss';
import img from '../../images/icon-movies.png';
import {favoriteStore} from "../../stores/FavoriteStore";

const Favorite = ({data: {id, poster_path, overview, title}}) => {
    const handleRemoveFavorite = useCallback(() => {
        favoriteStore.removeFavorite(id);
    }, [id]);

    return (
        <div className={styles.container}>
            <div className={styles.containerInfo}>
                <img src={`http://image.tmdb.org/t/p/w342${poster_path}`} alt={''}/>
                <div className={styles.descriptionContainer}>
                    <h3>{title}</h3>
                    <span>
                        {overview}
                    </span>
                </div>
                <button onClick={handleRemoveFavorite}>Удалить из избранного</button>
            </div>
        </div>
    );
};

export default Favorite;
