"use client";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getMovieId,
  getCreditsMovieId,
  getTrailerMovieId,
} from "@/store/movies/moviesActions";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function MovieDetail({
  params,
  getMovieId,
  getCreditsMovieId,
  getTrailerMovieId,
  selectedMovie,
  selectedMovieCredits,
  selectedMovieTrailer,
}: {
  params: { id: string };
  getMovieId: (id: String) => Promise<any>;
  getCreditsMovieId: (id: String) => Promise<any>;
  getTrailerMovieId: (id: String) => Promise<any>;
  selectedMovie: any;
  selectedMovieCredits: Array<any>;
  selectedMovieTrailer: any;
}) {
  const { id } = params;

  useEffect(() => {
    getMovieId(id);
    getCreditsMovieId(id);
    getTrailerMovieId(id);
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
              <div className="mx-10">
                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight text-white">
                  {selectedMovie.title}
                </h3>
                <p className="leading-7 [&:not(:first-child)]:mt-1 text-white">
                  {moment(selectedMovie.releaseDate).format("DD/MM/YYYY")} -{" "}
                  {mapGenresSelectedMovie(selectedMovie.genres)} -{" "}
                  {`${selectedMovie.runtime} min`}
                </p>
                <div className="w-[50px] h-[50px] mt-6">
                  <CircularProgressbar
                    value={66}
                    text={`${66}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      textColor: "#14FF00",
                      pathColor: "#14FF00",
                      trailColor: "transparent",
                    })}
                  />
                </div>
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
        <div className="container mx-auto my-10">
          <h3 className="text-2xl font-bold mb-5">Elenco Principal</h3>
          <div className="flex flex-row overflow-x-scroll">
            {selectedMovieCredits &&
              selectedMovieCredits.length > 0 &&
              selectedMovieCredits.map((credits) => {
                if (credits.profilePath) {
                  return (
                    <div
                      className="flex flex-col min-w-[160px] pb-3"
                      key={credits.id}
                    >
                      <Card className="m-1">
                        <CardContent className="p-2">
                          <img
                            src={`https://www.themoviedb.org/t/p/w138_and_h175_face${credits.profilePath}`}
                            alt="actor"
                            width={138}
                            height={175}
                            className="rounded-sm"
                          />
                          <div className="my-2 max-h-[50px]">
                            <small className="text-sm font-bold leading-none flex-nowrap">
                              {credits.originalName}
                            </small>
                            <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                              {credits.character.length > 20 ? (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      {credits.character}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{credits.character}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ) : (
                                credits.character
                              )}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                }
              })}
          </div>
        </div>
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
  };
};
export default connect(mapStateToProps, {
  getMovieId,
  getCreditsMovieId,
  getTrailerMovieId,
})(MovieDetail);
