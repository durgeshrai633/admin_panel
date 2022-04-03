import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  deleteSelectedUsers,
  fetchUsers,
  selectAll,
} from "../../store/userSlice";
import Pagination from "../Pagination/Pagination";
import UserRow from "../UserRow/UserRow";

function UsersTable() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(selected);
  return (
    <div>
      <input type='text' name='search' id='search' />
      <table>
        <thead>
          <tr>
            <th>
              {" "}
              <input
                type='checkbox'
                name='selectAll'
                id='selectAll'
                checked={selected}
                onChange={(e) => {
                  setSelected((prev) => !prev);
                  dispatch(selectAll(e.target.checked ? true : false));
                }}
              />{" "}
            </th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <UserRow></UserRow>
        </tbody>
      </table>
      <Pagination></Pagination>
      <div>
        <button
          className=''
          onClick={() => {
            dispatch(deleteSelectedUsers());
            dispatch(changePage());
            setSelected(false);
          }}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
}

export default UsersTable;
