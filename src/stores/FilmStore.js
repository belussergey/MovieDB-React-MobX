import {action, autorun, computed, makeObservable, observable, runInAction} from "mobx";
import {filmsListStore} from "./FilmsListStore";
import {favoriteStore} from "./FavoriteStore";

export class FilmStore {
    constructor() {
        makeObservable(this, {
            film: observable,
            id: observable,
            currentFilmIndex: computed,
            isFavorite:computed,
            fetchFilm: action,
            getNextFilmUrl: action,
            setId: action
        });
    }

    film = null;

    id = null;

    get currentFilmIndex() {
        const index = filmsListStore.data?.results.findIndex((film) => film.id === this.id) || 0;

        return index > -1 ? index : 0;
    }

    get isFavorite() {
        return favoriteStore.checkFavorite(this.id);
    }

    async fetchFilm(id) {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-RU`;
        const response = await fetch(url);
        const data = await response.json();

        runInAction(() => {
            this.film = data;
        });
    }

    async getNextFilmUrl() {
        let nextIndex = this.currentFilmIndex + 1;
        let nextPage = filmsListStore.currentPage;

        if (this.currentFilmIndex + 1 === filmsListStore.data.results.length) {
            await filmsListStore.loadPage(nextPage + 1);
            nextPage += 1;
            nextIndex = 0;
        }
        return (`/details/${nextPage}/${filmsListStore.data.results[nextIndex].id}`);
    }

    setId(id) {
        this.id = id;
    }
}

export const filmStore = new FilmStore();

autorun(() => {
    if (filmStore.id) {
        filmStore.fetchFilm(filmStore.id);
    }
});
