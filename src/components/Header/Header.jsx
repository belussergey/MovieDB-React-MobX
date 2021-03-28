import React, {useCallback} from 'react';
import styles from './Header.module.scss';
import img from '../../images/icon-movies.png';
import {useHistory} from 'react-router';

const Header = () => {
    const history = useHistory();

    const handleToFavorites = useCallback(() => {
        history.push('/favorites');
    }, [history]);

    const handleToMain = useCallback(() => {
        history.push('/');
    }, [history]);

    return (
        <div className={styles.container}>
            <div className={styles.logo} onClick={handleToMain}>
                <img src={img} alt="icon"/><span>Movies</span>
            </div>
            <button className={styles.containerBtn} onClick={handleToFavorites}>Favorites</button>
        </div>
    );
};

export default Header;
