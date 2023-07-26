import React, { useState } from "react";
import { Button } from "./ui/button";
import CloseIcon from "@/assets/close-circle.png";
import Image from "next/image";

interface Props {
  readonly filterItens: any;
  readonly getMoviveByGenre: (arg0: string) => void;
  readonly getAllMovies: () => void;
}

const FilterComponent: React.FC<Props> = ({
  filterItens,
  getMoviveByGenre,
  getAllMovies,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  async function hendleMoviesByGenre(genre: any) {
    getMoviveByGenre(genre.id);
    setSelectedGenre(genre.name);
  }
  async function clearFilterMovies() {
    setSelectedGenre("");
    getAllMovies();
  }
  return (
    <>
      <div className="container mx-auto mt-2 mb-10">
        <div className="flex flex-row items-center justify-center flex-wrap">
          {filterItens &&
            filterItens.length > 0 &&
            filterItens.map((item: any) => {
              if (selectedGenre === item.name) {
                return (
                  <Button
                    key={item.id}
                    className="bg-yellow-600 mx-1 mt-2 text-white font-bold hover:bg-yellow-700"
                  >
                    {item.name}{" "}
                    <Button
                      onClick={() => clearFilterMovies()}
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
