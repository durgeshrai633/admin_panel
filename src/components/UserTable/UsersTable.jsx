import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changePage,
  deleteSelectedUsers,
  fetchUsers,
  selectAll,
} from "../../store/userSlice";
import Pagination from "../Pagination/Pagination";
import UserRow from "../UserRow/UserRow";

function UsersTable() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div className='container-sm d-flex flex-column gap-3 p-5'>
      <input
        type='text'
        class='form-control'
        name='search'
        id='search'
        placeholder='Search by mail, name or role'
      />
      <table class='table table-hover p-5'>
        <thead>
          <tr>
            <th scope='col'>
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
            <th scope='col'>NAME</th>
            <th scope='col'>EMAIL</th>
            <th scope='col'>ROLE</th>
            <th scope='col'>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <UserRow></UserRow>
        </tbody>
      </table>
      <div className='d-flex p-2 bd-highlight gap-3'>
        <button
          type='button'
          class='btn btn-danger align-self-left'
          onClick={() => {
            dispatch(deleteSelectedUsers());
            dispatch(changePage());
            setSelected(false);
          }}
        >
          Delete Selected
        </button>
        <Pagination></Pagination>
      </div>
    </div>
  );
}

export default UsersTable;
