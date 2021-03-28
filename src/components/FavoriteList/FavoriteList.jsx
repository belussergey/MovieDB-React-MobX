import React from 'react';
import Favorite from '../Favorite/Favorite';
import styles from '../FavoriteList/FavoriteList.module.scss';
import {observer} from "mobx-react";
import {favoriteStore} from "../../stores/FavoriteStore";

const FavoriteList = () => {

    return (
        <div className={styles.container}>
            <h2>{favoriteStore.list.length ? 'Мои избранные фильмы' : 'К сожалению, в вашем избранном пока пусто'}</h2>
            {favoriteStore.list.map(filmFavorite => <Favorite key={filmFavorite.id} data={filmFavorite}
            />)}
        </div>
    );
};

export default observer(FavoriteList);
