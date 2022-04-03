import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  firstPage,
  lastPage,
  nextPage,
  prevPage,
  setCurrentPage,
} from "../../store/userSlice";

function Pagination() {
  const perPageCount = useSelector((state) => state.perPageCount);
  const currentPage = useSelector((state) => state.currentPage);
  const totalUsers = useSelector((state) => state.users.length);
  const dispatch = useDispatch();

  const pages = [];
  for (let page = 1; page <= Math.ceil(totalUsers / perPageCount); page++) {
    pages.push(page);
  }
  function newPage(pageNumber) {
    dispatch(setCurrentPage(pageNumber));
    dispatch(changePage());
  }
  return (
    <div className='d-flex p-2 bd-highlight gap-3 align-self-center'>
      <button
        type='button'
        className='btn btn-outline-primary'
        onClick={() => {
          dispatch(firstPage());
          dispatch(changePage());
        }}
      >
        {"<<"}
      </button>
      <button
        type='button'
        className='btn btn-outline-primary'
        onClick={() => {
          dispatch(prevPage());
          dispatch(changePage());
        }}
      >
        {"<"}
      </button>
      {pages.map((page) => {
        return (
          <button
            type='button'
            className={`btn btn-outline-primary ${
              currentPage === page ? "bg-primary text-white" : ""
            }`}
            key={page}
            onClick={() => newPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        type='button'
        className='btn btn-outline-primary'
        onClick={() => {
          dispatch(nextPage());
          dispatch(changePage());
        }}
      >
        {">"}
      </button>
      <button
        type='button'
        className='btn btn-outline-primary'
        onClick={() => {
          dispatch(lastPage());
          dispatch(changePage());
        }}
      >
        {">>"}
      </button>
    </div>
  );
}

export default Pagination;
