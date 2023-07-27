import { Genres } from "../genres";

export interface Movies {
  adult: boolean;
  backdropPath: String;
  genreIds: Array<any>;
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

export interface Movie {
  adult: boolean;
  backdropPath: String;
  belongsToCollection: any;
  genres: Array<Genres>;
  budget: number;
  id: Number;
  homepage: String;
  imdbId: String;
  originalLanguage: String;
  originalTitle: String;
  overview: String;
  popularity: Number;
  posterPath: String;
  productionCompanies: Array<ProductionCompanies>;
  productionCountries: Array<ProductionCountries>;
  releaseDate: String;
  revenue: Number;
  runtime: Number;
  spokenLanguages: Array<SpokenLanguages>;
  status: String;
  tagline: String;
  title: String;
  video: boolean;
  voteAverage: Number;
  voteCount: Number;
}

interface ProductionCompanies {
  id: number;
  logoPath: String;
  name: String;
  originCountry: String;
}

interface ProductionCountries {
  iso31661: String;
  name: String;
}

interface SpokenLanguages {
  englishName: String;
  iso6391: String;
  name: String;
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

export const mapMovieDataId = (movie: any): Movie => {
  const productionCompanies =
    (movie["production_companies"] &&
      movie["production_companies"].length &&
      movie["production_companies"].map((mappedItem: any) => {
        return {
          id: mappedItem["id"],
          logoPath: mappedItem["logo_path"],
          name: mappedItem["name"],
          origin_country: mappedItem["origin_country"],
        };
      })) ||
    [];

  const productionCountries =
    (movie["production_countries"] &&
      movie["production_countries"].length &&
      movie["production_countries"].map((mappedItem: any) => {
        return {
          iso31661: mappedItem["iso_3166_1"],
          name: mappedItem["name"],
        };
      })) ||
    [];
  const spokenLanguages =
    (movie["spoken_languages"] &&
      movie["spoken_languages"].length &&
      movie["spoken_languages"].map((mappedItem: any) => {
        return {
          iso31661: mappedItem["iso_3166_1"],
          name: mappedItem["name"],
          englishName: mappedItem["english_name"],
        };
      })) ||
    [];

  return {
    adult: movie["adult"],
    backdropPath: movie["backdrop_path"],
    belongsToCollection: movie["belongs_to_collection"],
    genres: movie["genres"],
    budget: movie["budget"],
    id: movie["id"],
    homepage: movie["homepage"],
    imdbId: movie["imdb_id"],
    originalLanguage: movie["original_language"],
    originalTitle: movie["original_title"],
    overview: movie["overview"],
    popularity: movie["popularity"],
    posterPath: movie["poster_path"],
    productionCompanies: productionCompanies,
    productionCountries: productionCountries,
    releaseDate: movie["release_date"],
    revenue: movie["revenue"],
    runtime: movie["runtime"],
    spokenLanguages: spokenLanguages,
    status: movie["status"],
    tagline: movie["tagline"],
    title: movie["title"],
    video: movie["video"],
    voteAverage: movie["vote_average"],
    voteCount: movie["vote_count"],
  };
};
