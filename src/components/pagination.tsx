import type { FC } from "react";
import classnames from "classnames";
import usePagination from "@/hooks/usePagination";

interface Props {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination: FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = "",
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const baseStyles =
    "px-2.5 py-1 flex justify-center items-center rounded-md text-[1rem] bg-white hover:bg-grey-300 text-purple-700 font-bold select-none cursor-pointer";

  return (
    <ul
      className={classnames("flex justify-center flex-wrap gap-2", className)}
    >
      <li
        className={classnames(baseStyles, {
          hidden: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "DOTS") {
          return (
            <li key={index} className="select-none">
              ...
            </li>
          );
        }
        return (
          <li
            key={index}
            className={classnames(baseStyles, {
              "font-bold border border-purple-500": pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames(baseStyles, {
          hidden: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </li>
    </ul>
  );
};

export default Pagination;
