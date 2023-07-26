import React, { useState } from "react";
import { Button } from "./ui/button";
import CloseIcon from "@/assets/close-circle.png";
import Image from "next/image";

interface Props {
  readonly filterItens: any;
  readonly getMoviveByGenre: (arg0: Array<any>) => void;
  readonly getAllMovies: () => void;
  readonly handleFavoritesGenre: (arg0: Array<any>) => void;
}

const FilterComponent: React.FC<Props> = ({
  filterItens,
  getMoviveByGenre,
  getAllMovies,
  handleFavoritesGenre,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<Array<any>>([]);

  async function hendleMoviesByGenre(genre: any) {
    let arraySelectedGenres: any[] = [];
    if (selectedGenre && selectedGenre.length > 0) {
      arraySelectedGenres = [...selectedGenre, genre.id];
      setSelectedGenre(arraySelectedGenres);
    } else {
      arraySelectedGenres.push(genre.id);
      setSelectedGenre(arraySelectedGenres);
    }
    handleFavoritesGenre(arraySelectedGenres);
    getMoviveByGenre(arraySelectedGenres);
  }
  async function clearFilterMovies(id: Number) {
    let arraySelectedGenres: any[] = selectedGenre;
    let indice = arraySelectedGenres.indexOf(id);
    if (indice >= 0) {
      arraySelectedGenres.splice(indice, 1);
    }

    if (arraySelectedGenres && arraySelectedGenres.length > 0) {
      getMoviveByGenre(arraySelectedGenres);
      setSelectedGenre(arraySelectedGenres);
      handleFavoritesGenre(arraySelectedGenres);
    } else {
      setSelectedGenre([]);
      handleFavoritesGenre([]);
      getAllMovies();
    }
  }
  return (
    <>
      <div className="container mx-auto mt-2 mb-10">
        <div className="flex flex-row items-center justify-center flex-wrap">
          {filterItens &&
            filterItens.length > 0 &&
            filterItens.map((item: any) => {
              if (selectedGenre.indexOf(item.id) > -1) {
                return (
                  <Button
                    key={item.id}
                    className="bg-yellow-600 mx-1 mt-2 text-white font-bold hover:bg-yellow-700"
                  >
                    {item.name}{" "}
                    <Button
                      onClick={() => clearFilterMovies(item.id)}
                      variant="ghost"
                      className="px-2 py-0 hover:bg-yellow-700"
                    >
                      <Image src={CloseIcon} alt="close" />
                    </Button>
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={item.id}
                    onClick={() => {
                      hendleMoviesByGenre(item);
                    }}
                    className="mx-1 mt-2 text-slate-700 font-bold"
                  >
                    {item.name}
                  </Button>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default FilterComponent;
