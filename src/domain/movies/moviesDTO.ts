export interface Movies {
  adult: boolean;
  backdropPath: String;
  genreIds: [];
  id: Number;
  originalLanguage: String;
  originalTitle: String;
  overview: String;
  popularity: Number;
  posterPath: String;
  releaseDate: String;
  title: String;
  video: boolean;
  voteAverage: Number;
  voteCount: Number;
}

export const mapMoviesAllData = (movies: any): Array<Movies> => {
  const allMovies =
    (movies &&
      movies.length &&
      movies.map((mappedItem: any) => {
        return {
          backdropPath: mappedItem["backdrop_path"],
          adult: mappedItem["adult"],
          genreIds: mappedItem["genre_ids"],
          id: mappedItem["id"],
          originalLanguage: mappedItem["original_language"],
          originalTitle: mappedItem["original_title"],
          overview: mappedItem["overview"],
          popularity: mappedItem["popularity"],
          posterPath: mappedItem["poster_path"],
          releaseDate: mappedItem["release_date"],
          title: mappedItem["title"],
          video: mappedItem["video"],
          voteAverage: mappedItem["vote_average"],
          voteCount: mappedItem["vote_count"],
        };
      })) ||
    [];

  return allMovies;
};
