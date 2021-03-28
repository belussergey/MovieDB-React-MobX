import {action, autorun, makeObservable, observable, runInAction} from "mobx";

export class FilmsListStore {
    constructor() {
        makeObservable(this, {
            data: observable,
            currentPage: observable,
            loadPage: action,
            setCurrentPage: action
        });
    }

    data = null;

    currentPage = null;

    async loadPage(page) {
        const url = `http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-Ru&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        runInAction(() => {
            this.data = data;
        });
    }

    setCurrentPage(page) {
        this.currentPage = page;
    }
}

export const filmsListStore = new FilmsListStore();

autorun(() => {
    if (filmsListStore.currentPage) {
        filmsListStore.loadPage(filmsListStore.currentPage);
    }
});