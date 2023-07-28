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

export interface Casts {
  adult: boolean;
  gender: Number;
  id: Number;
  knownForDepartment: String;
  name: String;
  originalName: String;
  popularity: String;
  profilePath: String;
  castId: Number;
  character: String;
  creditId: String;
  order: Number;
}

export interface Trailer {
  name: String;
  key: String;
  type: String;
  official: String;
}

export const mapMoviesAllData = (movies: any): Array<Movies> => {
  const allMovies =
    (movies &&
      movies.length > 0 &&
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

export const mapCastData = (casts: any): Array<Casts> => {
  const allCasts =
    (casts &&
      casts.length > 0 &&
      casts.map((mappedItem: any) => {
        return {
          adult: mappedItem["adult"],
          gender: mappedItem["gender"],
          id: mappedItem["id"],
          knownForDepartment: mappedItem["known_for_department"],
          name: mappedItem["name"],
          originalName: mappedItem["original_name"],
          popularity: mappedItem["popularity"],
          profilePath: mappedItem["profile_path"],
          castId: mappedItem["cast_id"],
          character: mappedItem["character"],
          creditId: mappedItem["credit_id"],
          order: mappedItem["order"],
        };
      })) ||
    [];

  return allCasts;
};

export const mapTrailerData = (videos: any): Trailer => {
  const trailer =
    (videos &&
      videos.length > 0 &&
      videos.find(
        (mappedItem: any) =>
          mappedItem.type === "Trailer" && mappedItem.official === true
      )) ||
    {};

  return {
    name: trailer.name,
    key: trailer.key,
    type: trailer.type,
    official: trailer.official,
  };
};
