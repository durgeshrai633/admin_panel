import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../store/userSlice";
import User from "./User";

function UserRow() {
  const page = useSelector((state) => state.page);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changePage());
  }, [dispatch, users]);
  return (
    <>
      {page &&
        page.map(({ name, email, id, role, selected }) => {
          return (
            <User
              key={id}
              name={name}
              email={email}
              id={id}
              role={role}
              selected={selected}
            ></User>
          );
        })}
    </>
  );
}

export default UserRow;
