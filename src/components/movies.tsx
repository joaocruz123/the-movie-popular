import { Movies } from "@/domain/movies";
import React from "react";
import SkeletonLoading from "./skeletonLoading";
import Link from "next/link";
import moment from "moment";

interface Props {
  readonly movies: Array<Movies>;
  readonly loading: boolean;
}

const MoviesComponent: React.FC<Props> = ({ movies, loading }) => {
  return (
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
                <Link href={`/movie/${movie.id}`}>
                  <div key={movie.id} className="cursor-pointer">
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
                </Link>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MoviesComponent;
