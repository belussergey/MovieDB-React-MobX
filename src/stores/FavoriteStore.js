import {action, makeObservable, observable} from "mobx";

export class FavoriteStore {
    constructor() {
        makeObservable(this, {
            list: observable,
            setFavorites: action
        });
        this.list = this.getFavorites();
    }

    favoritesKey = 'favorites';

    list = [];

    getFavorites = () => JSON.parse(localStorage.getItem(this.favoritesKey)) || [];

    setFavorites = list => {
        localStorage.setItem(this.favoritesKey, JSON.stringify(list));
        this.list = list;
    }


    addFavoriteFilm = film => this.setFavorites([...this.list, film]);

    checkFavorite = id => !!this.list.find(film => film.id === +id);

    removeFavorite = id => this.setFavorites(this.list.filter(film => film.id !== +id));
}

export const favoriteStore = new FavoriteStore();
