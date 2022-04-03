import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleUser,
  editUser,
  selectSingleUser,
} from "../../store/userSlice";

function User({ name, email, id, role, selected }) {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({ name, email, id, role, selected });
  const dispatch = useDispatch();
  console.log(user);
  return (
    <tr key={id}>
      <td>
        {" "}
        <input
          type='checkbox'
          name='selectUser'
          id='selectUser'
          checked={selected}
          onChange={() => dispatch(selectSingleUser({ id }))}
        />{" "}
      </td>
      {edit ? (
        <>
          <td>
            <input
              type='text'
              name='name'
              defaultValue={name}
              id='name'
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type='text'
              name='email'
              defaultValue={email}
              id='email'
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type='text'
              name='role'
              defaultValue={role}
              id='role'
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{email}</td>
          <td>{role}</td>
        </>
      )}
      <td>
        {edit ? (
          <button
            onClick={() => {
              setEdit(false);
              dispatch(editUser(user));
            }}
          >
            Submit
          </button>
        ) : (
          <button onClick={() => setEdit(true)}>Edit</button>
        )}
        <button onClick={() => dispatch(deleteSingleUser(id))}>Delete</button>
      </td>
    </tr>
  );
}

export default User;
