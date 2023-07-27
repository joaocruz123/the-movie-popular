"use client";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getMovieId } from "@/store/movies/moviesActions";
import moment from "moment";

function MovieDetail({
  params,
  getMovieId,
  selectedMovie,
}: {
  params: { id: string };
  getMovieId: (page: String) => Promise<any>;
  selectedMovie: any;
}) {
  const { id } = params;

  useEffect(() => {
    getMovieId(id);
  }, []);

  const mapGenresSelectedMovie = (genres: Array<any>) => {
    let genresNames: Array<any> = [];

    if (genres && genres.length > 0) {
      genresNames = genres.map((genre: any) => {
        return genre.name;
      });
    }

    return genresNames.join(", ");
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 bg-pink-900">
      <div className="container mx-auto my-10">
        <div className="flex flex-row items-start justify-center">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${selectedMovie.posterPath}`}
            alt="logo"
            width={300}
            height={450}
            loading="lazy"
          />
          <div className="mx-10">
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight text-white">
              {selectedMovie.title}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-1 text-white">
              {moment(selectedMovie.releaseDate).format("DD/MM/YYYY")} -{" "}
              {mapGenresSelectedMovie(selectedMovie.genres)} -{" "}
              {`${selectedMovie.runtime} min`}
            </p>
            <h3 className="text-lg font-semibold tracking-tight [&:not(:first-child)]:mt-6 text-white">
              Sinopse:
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2 text-slate-100">
              {selectedMovie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    selectedMovie: (state.movies && state.movies.selectedMovie) || null,
  };
};
export default connect(mapStateToProps, {
  getMovieId,
})(MovieDetail);
