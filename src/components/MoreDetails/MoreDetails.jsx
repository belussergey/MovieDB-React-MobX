import React, {useCallback, useEffect} from 'react';
import styles from '../../components/MoreDetails/MoreDetails.module.scss';
import {useHistory, useParams} from 'react-router';
import icon from '../../images/next.svg';
import {filmStore} from "../../stores/FilmStore";
import {observer} from "mobx-react";
import {filmsListStore} from "../../stores/FilmsListStore";
import {favoriteStore} from "../../stores/FavoriteStore";


const MoreDetails = () => {
    const history = useHistory();
    const {id, page} = useParams();
    const {film, isFavorite} = filmStore;

    const styleBack = {
        backgroundImage: film && `url(http://image.tmdb.org/t/p/w342/${film.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    };

    const handleOnBackList = useCallback(() => {
        history.push(`/${page}`);
    }, [history, page]);

    const handleAddFavorite = useCallback(() => {
        favoriteStore.addFavoriteFilm(film);
    }, [film]);

    const handleRemoveFavorite = useCallback(() => {
        favoriteStore.removeFavorite(id);
    }, [id]);

    const handleOnNextFilm = useCallback(async () => {
        const route = await filmStore.getNextFilmUrl();
        
        history.push(route);
    }, [history]);

    useEffect(() => {
        filmStore.setId(+id);
        filmsListStore.setCurrentPage(+page);
    }, [id, page]);

    return (
        <div style={styleBack}>
            {film && <div className={styles.containerBlur}>
                <div className={styles.container}>
                    <div className={styles.containerBtn}>
                        <button className={styles.buttonMenu} onClick={handleOnBackList}>
                            <img className={styles.iconLeft} src={icon} alt=""/>Вернуться к списку
                        </button>
                        <button className={styles.buttonMenu} onClick={handleOnNextFilm}>
                            Следующий фильм<img className={styles.iconRight} src={icon} alt={''}/>
                        </button>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={`http://image.tmdb.org/t/p/w342/${film.poster_path}`} alt={film.title}/>
                        <div className={styles.cont}>
                            <div className={styles.infoContainer}>
                                <h3 className={styles.titleContainer}>{film.title}</h3>
                                <div className={styles.ratingContainer}>
                                    <span>Оценка: {film.vote_average}</span>
                                    <span>Рейтинг: R</span>
                                    <span>Дата релиза: {film.release_date}</span>
                                </div>
                                <span className={styles.description}>
                        {film.overview}
                    </span>
                            </div>
                            <button className={styles.buttonHover}
                                    onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}>
                                {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default observer(MoreDetails);
