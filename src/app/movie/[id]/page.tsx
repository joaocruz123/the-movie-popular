"use client";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getMovieId,
  getCreditsMovieId,
  getTrailerMovieId,
  getRecommendationsMovieId,
} from "@/store/movies/moviesActions";
import moment from "moment";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaCircle } from "react-icons/fa";
import CastComponent from "@/components/cast";
import MoviesComponent from "@/components/movies";

function MovieDetail({
  params,
  getMovieId,
  getCreditsMovieId,
  getTrailerMovieId,
  getRecommendationsMovieId,
  selectedMovie,
  selectedMovieCredits,
  selectedMovieTrailer,
  selectedMovieRecomendations,
}: {
  params: { id: string };
  getMovieId: (id: String) => Promise<any>;
  getCreditsMovieId: (id: String) => Promise<any>;
  getTrailerMovieId: (id: String) => Promise<any>;
  getRecommendationsMovieId: (id: String) => Promise<any>;
  selectedMovie: any;
  selectedMovieCredits: any;
  selectedMovieTrailer: any;
  selectedMovieRecomendations: Array<any>;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = params;

  useEffect(() => {
    getMovieId(id);
    getCreditsMovieId(id);
    getTrailerMovieId(id);
    getRecommendationsMovieId(id);

    setTimeout(() => setLoading(false), 2000);
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

  const generatePercent = (percent: number) => {
    const round = Math.round(percent);
    const result = (100 * round) / 10000;
    return Math.round(result);
  };

  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-950">
        <div className="flex flex-col items-center justify-center px-6 bg-pink-900 relative">
          <div className="container mx-auto my-10">
            <div className="flex flex-col items-start justify-center xl:flex-row">
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${selectedMovie.posterPath}`}
                alt="logo"
                width={300}
                height={450}
                loading="lazy"
                className="rounded-sm"
              />
              <div className="mx-0 mt-6 xl:mx-10 xl:mt-0">
                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight text-white">
                  {selectedMovie.title}
                </h3>
                <div className="flex flex-col items-start xl:flex-row xl:items-center">
                  <p className="xl:mt-1 mt-0 text-white mx-1">
                    {moment(selectedMovie.releaseDate).format("DD/MM/YYYY")}{" "}
                  </p>
                  <p className="mt-1 text-white mx-1 xl:visible invisible">
                    <FaCircle size={4} />
                  </p>
                  <p className="xl:mt-1 mt-0 text-white mx-1">
                    {mapGenresSelectedMovie(selectedMovie.genres)}{" "}
                  </p>
                  <p className="mt-1 text-white mx-1 xl:visible invisible">
                    <FaCircle size={4} />
                  </p>
                  <p className="xl:mt-1 mt-0 text-white mx-1">
                    {`${selectedMovie.runtime} min`}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <div className="w-[60px] h-[60px] mt-3 bg-pink-800 rounded-full p-1">
                    <CircularProgressbar
                      value={generatePercent(selectedMovie.popularity)}
                      text={`${generatePercent(selectedMovie.popularity)}%`}
                      strokeWidth={10}
                      styles={buildStyles({
                        textSize: "1.7rem",
                        textColor: "#14FF00",
                        pathColor: "#14FF00",
                        trailColor: "transparent",
                      })}
                    />
                  </div>
                  <p className="leading-5 [&:not(:first-child)]:mt-3 text-white mx-4 ">
                    Avaliação dos
                    <br /> usuários
                  </p>
                </div>
                <h3 className="text-lg font-semibold tracking-tight [&:not(:first-child)]:mt-6 text-white">
                  Sinopse:
                </h3>
                <p className="leading-7 [&:not(:first-child)]:mt-2 text-slate-100">
                  {selectedMovie.overview}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[850px] mt-6">
                  {selectedMovieCredits.crew &&
                    selectedMovieCredits.crew.length > 0 &&
                    selectedMovieCredits.crew
                      .map((crew: any) => {
                        return (
                          <div>
                            <small className="text-sm font-bold leading-none text-white">
                              {crew.originalName}
                            </small>
                            <p className="text-sm text-white">{crew.job}</p>
                          </div>
                        );
                      })
                      .slice(0, 10)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {selectedMovieCredits &&
          selectedMovieCredits.cast &&
          selectedMovieCredits.cast.length > 0 && (
            <CastComponent credits={selectedMovieCredits} loading={loading} />
          )}
        <div className="container mx-auto my-10">
          <h3 className="text-2xl font-bold mb-5">Trailer</h3>
          <iframe
            width="100%"
            height="580"
            src={`https://www.youtube.com/embed/${selectedMovieTrailer.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="container mx-auto my-10">
          {selectedMovieRecomendations &&
            selectedMovieRecomendations.length > 0 && (
              <h3 className="text-2xl font-bold mb-5">Recomendações</h3>
            )}
          <MoviesComponent
            movies={selectedMovieRecomendations}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    selectedMovie: (state.movies && state.movies.selectedMovie) || null,
    selectedMovieCredits:
      (state.movies && state.movies.selectedMovieCredits) || null,
    selectedMovieTrailer:
      (state.movies && state.movies.selectedMovieTrailer) || null,
    selectedMovieRecomendations:
      (state.movies && state.movies.selectedMovieRecomendations) || [],
  };
};
export default connect(mapStateToProps, {
  getMovieId,
  getCreditsMovieId,
  getTrailerMovieId,
  getRecommendationsMovieId,
})(MovieDetail);
