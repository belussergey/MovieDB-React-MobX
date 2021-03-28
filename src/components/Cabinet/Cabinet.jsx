import React from 'react';
import styles from '../Cabinet/Cabinet.module.css';
import FilmList from '../FilmList/FilmList';
import {Route, Switch} from 'react-router';
import MoreDetails from '../MoreDetails/MoreDetails';
import FavoriteList from '../FavoriteList/FavoriteList';

const Cabinet = () => {

    return (
        <div className={styles.cabinet}>
                <Switch>
                    <Route path="/favorites">
                        <FavoriteList />
                    </Route>
                    <Route path="/details/:page/:id">
                        <MoreDetails />
                    </Route>
                    <Route path="/:page?">
                        <FilmList />
                    </Route>
                </Switch>
        </div>
    );
};

export default Cabinet;
