import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, setCurrentPage } from "../../store/userSlice";

function Pagination() {
  const perPageCount = useSelector((state) => state.perPageCount);
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
    <div>
      <button>{"<<"}</button>
      <button>{"<"}</button>
      {pages.map((page) => {
        return (
          <button key={page} onClick={() => newPage(page)}>
            {page}
          </button>
        );
      })}
      <button>{">"}</button>
      <button>{">>"}</button>
    </div>
  );
}

export default Pagination;
