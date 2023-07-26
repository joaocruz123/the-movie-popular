"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { getAllMovies } from "@/store/movies/moviesActions";
import { getAllGenres, getGenreId } from "@/store/genres/genresActions";
import Logo from "@/assets/logo.png";
import moment from "moment";
import "moment/locale/pt-br";
import FilterComponent from "@/components/filter";
import SkeletonLoading from "@/components/skeletonLoading";

function Home(props: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const { getAllMovies, getAllGenres, getGenreId, movies, genres } = props;

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    getAllMovies();
    getAllGenres();
  }, []);

  async function getMoviveByGenre(id: String) {
    setLoading(true);
    await getGenreId(id).then(() => setLoading(false));
  }

  async function getAllMoviesClearFiler() {
    setLoading(true);
    await getAllMovies().then(() => setLoading(false));
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
          <FilterComponent
            filterItens={genres}
            getMoviveByGenre={getMoviveByGenre}
            getAllMovies={getAllMoviesClearFiler}
          />
        )}
      </div>

      <div className="container mx-auto my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
    </main>
  );
}

const mapStateToProps = (state: any) => {
  return {
    movies: (state.movies && state.movies.movies) || [],
    genres: (state.genres && state.genres.genres) || [],
  };
};
export default connect(mapStateToProps, {
  getAllMovies,
  getAllGenres,
  getGenreId,
})(Home);
