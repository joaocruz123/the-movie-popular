"use client";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllMovies } from "@/store/movies/moviesActions";
import {
  getAllGenres,
  getGenreId,
  setFavorites,
} from "@/store/genres/genresActions";
import "moment/locale/pt-br";
import FilterComponent from "@/components/filter";
import Pagination from "@/components/pagination";
import MoviesComponent from "@/components/movies";

interface Props {
  getAllMovies: (page: number) => Promise<any>;
  getAllGenres: () => Promise<any>;
  getGenreId: (genreId: Array<any>, page: number) => Promise<any>;
  setFavorites: (favorites: any[]) => void;
  movies: any[];
  genres: any[];
  page: number;
  totalPages: number;
  totalResults: number;
  favorites: any[];
}

function Home(props: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTotalPages, setCurrentTotalPages] = useState<number>(1);
  const [currentTotalResults, setCurrentTotalResults] = useState<number>(1);

  const {
    getAllMovies,
    getAllGenres,
    getGenreId,
    movies,
    genres,
    page,
    totalPages,
    totalResults,
    setFavorites,
    favorites,
  } = props;

  useEffect(() => {
    if (page) setCurrentPage(page);
    if (totalPages) setCurrentTotalPages(totalPages);
    if (totalResults) setCurrentTotalResults(totalResults);

    setTimeout(() => setLoading(false), 2000);
  }, [page, totalPages, totalResults]);

  useEffect(() => {
    getAllMovies(page);
    getAllGenres();
  }, []);

  async function getMovieByGenre(
    ids: any[],
    currentPage: number
  ): Promise<void> {
    setLoading(true);
    await getGenreId(ids, currentPage).then(() => setLoading(false));
  }

  async function getAllMoviesClearFiler(): Promise<void> {
    setLoading(true);
    await getAllMovies(currentPage).then(() => setLoading(false));
  }

  const handlePageChange = (page: number): void => {
    setLoading(true);
    setCurrentPage(page);

    if (favorites && favorites.length > 0) {
      getMovieByGenre(favorites, page);
    } else {
      getAllMovies(page).then(() => setLoading(false));
    }
  };

  async function handleFavoritesGenre(favorites: Array<any>): Promise<void> {
    setFavorites(favorites);
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center px-6 bg-pink-900">
        <h1 className="scroll-m-20 mt-20 mb-10 text-4xl font-extrabold tracking-tight lg:text-5xl text-white md:w-[750px] text-center">
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </h1>
        {genres && (
          <>
            <small className="text-sm font-medium leading-none text-center text-white">
              FILTRE POR:
            </small>
            <FilterComponent
              filterItens={genres}
              getMovieByGenre={getMovieByGenre}
              getAllMovies={getAllMoviesClearFiler}
              handleFavoritesGenre={handleFavoritesGenre}
              favorites={favorites}
            />
          </>
        )}
      </div>

      <MoviesComponent movies={movies} loading={loading} />

      <Pagination
        onPageChange={handlePageChange}
        totalCount={currentTotalResults}
        siblingCount={1}
        currentPage={currentPage}
        pageSize={currentTotalPages}
        className="mb-10"
      />
    </main>
  );
}

const mapStateToProps = (state: any) => {
  return {
    movies: (state.movies && state.movies.movies) || [],
    genres: (state.genres && state.genres.genres) || [],
    page: (state.movies && state.movies.page) || 1,
    totalPages: (state.movies && state.movies.totalPages) || 1,
    totalResults: (state.movies && state.movies.totalResults) || 1,
    favorites: (state.genres && state.genres.favorites) || [],
  };
};
export default connect(mapStateToProps, {
  getAllMovies,
  getAllGenres,
  getGenreId,
  setFavorites,
})(Home);
