import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../API/api";

export const fetchUsers = createAsyncThunk("users/fetchData", async () => {
  const { data } = await axios.get(API_URL);
  const updatedUsers = [...addExtraFields(data)];
  return updatedUsers;
});

const addExtraFields = (users) => {
  const updatedUserFields = users.map((user) => {
    return { ...user, selected: false };
  });
  return updatedUserFields;
};

const initialState = {
  users: [],
  currentPage: 1,
  perPageCount: 10,
  page: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteSingleUser: (state, { payload }) => {
      const pageLastUserIndex = state.currentPage * state.perPageCount;
      const pageFirstUserIndex = pageLastUserIndex - state.perPageCount;
      for (let i = pageFirstUserIndex; i < pageLastUserIndex; i++) {
        if (state.users[i].id === payload) {
          state.users.splice(i, 1);
          break;
        }
      }
    },
    deleteSelectedUsers: (state) => {
      const pageLastUserIndex = state.currentPage * state.perPageCount;
      const pageFirstUserIndex = pageLastUserIndex - state.perPageCount;
      for (let i = pageLastUserIndex - 1; i >= pageFirstUserIndex; i--) {
        if (state.users[i] && state.users[i].selected === true) {
          state.users.splice(i, 1);
        }
      }
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    changePage: (state) => {
      const pageLastUserIndex = state.currentPage * state.perPageCount;
      const pageFirstUserIndex = pageLastUserIndex - state.perPageCount;
      return {
        ...state,
        page: state.users.slice(pageFirstUserIndex, pageLastUserIndex),
      };
    },
    selectAll: (state, { payload }) => {
      const pageLastUserIndex = state.currentPage * state.perPageCount;
      const pageFirstUserIndex = pageLastUserIndex - state.perPageCount;
      for (
        let start = pageFirstUserIndex;
        start < pageFirstUserIndex + state.page.length;
        start++
      ) {
        state.users[start].selected = payload;
      }
    },
    selectSingleUser: (state, { payload }) => {
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id === payload.id) {
          state.users[i].selected = !state.users[i].selected;
          break;
        }
      }
    },
    editUser: (state, { payload }) => {
      const pageLastUserIndex = state.currentPage * state.perPageCount;
      const pageFirstUserIndex = pageLastUserIndex - state.perPageCount;
      for (let i = pageFirstUserIndex; i < pageLastUserIndex; i++) {
        if (state.users[i].id === payload.id) {
          state.users[i] = { ...payload };
          break;
        }
      }
    },
    nextPage: (state) => {
      const totalPages = Math.ceil(state.users.length / state.perPageCount);
      if (totalPages > state.currentPage) state.currentPage++;
    },
    prevPage: (state) => {
      if (state.currentPage > 1) state.currentPage--;
    },
    firstPage: (state) => {
      state.currentPage = 1;
    },
    lastPage: (state) => {
      state.currentPage = Math.ceil(state.users.length / state.perPageCount);
    },
  },
  extraReducers: {
    [fetchUsers.pending]: () => {
      console.log("Pending");
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      console.log("Fulfilled");
      return { ...state, users: payload };
    },
    [fetchUsers.rejected]: () => {
      console.log("Some error happend");
    },
  },
});

export const {
  selectSingleUser,
  selectAll,
  editUser,
  setCurrentPage,
  changePage,
  deleteSingleUser,
  deleteSelectedUsers,
  nextPage,
  prevPage,
  firstPage,
  lastPage,
} = userSlice.actions;

export default userSlice.reducer;
