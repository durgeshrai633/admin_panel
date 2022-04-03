import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSingleUser,
  editUser,
  selectSingleUser,
} from "../../store/userSlice";

function User({ name, email, id, role, selected }) {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({ name, email, id, role, selected });
  const dispatch = useDispatch();
  return (
    <tr key={id} className={selected ? "bg-secondary text-white" : ""}>
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
              class='form-control'
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
              class='form-control'
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
              class='form-control'
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
      <td className='d-flex gap-3'>
        {edit ? (
          <button
            type='button'
            class='btn btn-primary m-10'
            onClick={() => {
              setEdit(false);
              dispatch(editUser(user));
            }}
          >
            Submit
          </button>
        ) : (
          <button
            type='button'
            class='btn btn-primary'
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}
        <button
          type='button'
          class='btn btn-danger'
          onClick={() => dispatch(deleteSingleUser(id))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default User;
