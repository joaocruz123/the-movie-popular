import { Casts } from "@/domain/movies";
import React from "react";
import SkeletonLoading from "./skeletonLoading";
import Link from "next/link";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Card, CardContent } from "./ui/card";

interface Props {
  readonly credits: any;
  readonly loading: boolean;
}

const CastComponent: React.FC<Props> = ({ credits, loading }) => {
  return (
    <div className="container mx-auto my-10">
      <h3 className="text-2xl font-bold mb-5">Elenco Principal</h3>
      <div className="flex flex-row overflow-x-scroll">
        {credits &&
          credits.cast.length > 0 &&
          credits.cast.map((item: any) => {
            if (item.profilePath) {
              return (
                <div
                  className="flex flex-col min-w-[160px] pb-3"
                  key={`${item && item.id}`}
                >
                  <Card className="m-1">
                    <CardContent className="p-2">
                      <img
                        src={`https://www.themoviedb.org/t/p/w138_and_h175_face${item.profilePath}`}
                        alt="actor"
                        width={138}
                        height={175}
                        className="rounded-sm"
                      />
                      <div className="my-2 max-h-[50px]">
                        <small className="text-sm font-bold leading-none flex-nowrap">
                          {item.originalName}
                        </small>
                        <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.character.length > 20 ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  {item.character}
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{item.character}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            item.character
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
  );
};

export default CastComponent;
