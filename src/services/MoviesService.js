import axios from 'axios'
import { AppState } from "../AppState"
import { Movie } from "../models/Movie"

const apiKey = 'api_key=545c6ef058e65396849dfbbf381cbca3'

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search/movie'
})

class MoviesService {

  async searchMovies(searchTerm, page) {
    console.log('search term in service', searchTerm, 'page number', page)
    const res = await movieApi(`?query=${searchTerm}&page=${page}&${apiKey}`)
    console.log('search movie res', res);
    AppState.searchResults = res.data.results.map(m => new Movie(m))
    AppState.totalPages = res.data.total_pages
    AppState.currentPage = res.data.page
  }
}

export const moviesService = new MoviesService()
