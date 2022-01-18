import { AppState } from "../AppState"
import { Movie } from "../models/Movie"
import Pop from "../utils/Pop"

class WatchlistService {

  constructor() {
    const localData = JSON.parse(localStorage.getItem('watchlist'))
    if (localData) {
      AppState.watchlist = localData.watchlist.map(m => new Movie(m))
    } else {
      AppState.watchlist = []
    }
  }

  saveToLocal() {
    localStorage.setItem('watchlist', JSON.stringify({
      watchlist: AppState.watchlist
    }))
  }

  async removeFromWatchlist(movie) {
    const remove = await Pop.confirm(`Are you sure you want to delete ${movie.title}?`)
    if (!remove) {
      return
    }
    const movieToDeleteIndex = AppState.watchlist.findIndex(m => m.id == movie.id)
    AppState.watchlist.splice(movieToDeleteIndex, 1)
    this.saveToLocal()
    Pop.toast(`${movie.title} was removed`)
  }

  async addToWatchlist(movie) {
    const foundMovie = AppState.watchlist.find(m => m.id == movie.id)
    if (foundMovie) {
      Pop.toast(`You already have ${movie.title} in your watchlist`, 'error')
      return
    }
    const searchedMovie = AppState.searchResults.find(m => m.id == movie.id)
    AppState.watchlist.push(searchedMovie)
    await this.saveToLocal()
    Pop.toast(`${searchedMovie.title} was added your watchlist`, 'success')
  }
}

export const watchlistService = new WatchlistService()
