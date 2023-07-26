"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { getAllMovies } from "@/store/movies/moviesActions";
import Logo from "@/assets/logo.png";
import moment from "moment";

function Home(props: any) {
  const { getAllMovies, movies } = props;

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <main className="flex-col md:flex">
      <div className="flex h-16 items-center px-6 bg-pink-600">
        <Image src={Logo} alt="logo" className="mx-10" />
        <div className="ml-auto flex items-center space-x-4">login</div>
      </div>
      <div className="flex items-center justify-center px-6 bg-pink-900">
        <h1 className="scroll-m-20 my-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white w-[750px] text-center">
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </h1>
      </div>

      <div className="container mx-auto my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies &&
            movies.length > 0 &&
            movies.map((movie: any) => {
              return (
                <>
                  <div>
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
                        {moment(movie.releaseDate).format("L")}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state: any) => {
  return {
    movies: (state.movies && state.movies.movies) || [],
  };
};
export default connect(mapStateToProps, {
  getAllMovies,
})(Home);
