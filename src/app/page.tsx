"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { getAllMovies } from "@/store/movies/moviesActions";
import {
  getAllGenres,
  getGenreId,
  setFavorites,
} from "@/store/genres/genresActions";
import Logo from "@/assets/logo.png";
import moment from "moment";
import "moment/locale/pt-br";
import FilterComponent from "@/components/filter";
import SkeletonLoading from "@/components/skeletonLoading";
import Pagination from "@/components/pagination";

function Home(props: any) {
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
    if (page) {
      setCurrentPage(page);
    }
    if (totalPages) {
      setCurrentTotalPages(totalPages);
    }

    if (totalResults) {
      setCurrentTotalResults(totalResults);
    }

    setTimeout(() => setLoading(false), 2000);
  }, [page, totalPages, totalResults]);

  useEffect(() => {
    getAllMovies(page);
    getAllGenres();
  }, []);

  async function getMoviveByGenre(ids: Array<any>) {
    setLoading(true);
    await getGenreId(ids, currentPage).then(() => setLoading(false));
  }

  async function getAllMoviesClearFiler() {
    setLoading(true);
    await getAllMovies().then(() => setLoading(false));
  }

  const handlePageChange = (page: number) => {
    setLoading(true);
    setCurrentPage(page);
    if (favorites && favorites.length > 0) {
      getMoviveByGenre(favorites);
    } else {
      getAllMovies(page).then(() => setLoading(false));
    }
  };

  async function handleFavoritesGenre(favorites: Array<any>) {
    setFavorites(favorites);
  }

  return (
    <main className="flex flex-col">
      <div className="flex h-16 items-center px-6 bg-pink-600">
        <Image src={Logo} alt="logo" className="mx-10" />
        <div className="ml-auto flex items-center space-x-4">login</div>
      </div>
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
              getMoviveByGenre={getMoviveByGenre}
              getAllMovies={getAllMoviesClearFiler}
              handleFavoritesGenre={handleFavoritesGenre}
            />
          </>
        )}
      </div>

      <div className="container mx-auto my-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {loading ? (
            <SkeletonLoading />
          ) : (
            movies &&
            movies.length > 0 &&
            movies.map((movie: any) => {
              return (
                <>
                  <div key={movie.id}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.posterPath}`}
                      alt="logo"
                      width={176}
                      height={274}
                      loading="lazy"
                    />
                    <div className="my-2">
                      <small className="text-sm font-bold leading-none">
                        {movie.originalTitle}
                      </small>
                      <p className="text-sm font-bold text-muted-foreground">
                        {moment(movie.releaseDate).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>

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
