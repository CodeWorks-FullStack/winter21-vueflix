export class Movie {
  constructor(data) {
    this.id = data.id
    this.overview = data.overview
    this.score = data.popularity || data.score
    this.title = data.title || 'N/A'
    this.img = data.poster_path ? 'https://image.tmdb.org/t/p/w500' + data.poster_path : 'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg' || data.img
  }
}
