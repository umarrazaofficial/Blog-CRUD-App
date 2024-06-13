import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data.jsx";

const userSlice = createSlice({
  name: "users",
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, number, email, name } = action.payload;
      const update_user = state.find((user) => user.id === id);
      if (update_user) {
        update_user.id = id;
        update_user.name = name;
        update_user.number = number;
        update_user.email = email;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const update_user = state.find((user) => user.id === id);
      if (update_user) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
