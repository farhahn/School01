import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fclassesList: [],  // ← empty array as default
    fclassDetails: {},
    loading: false,
    error: null,
  };

const fclassSlice = createSlice({
  name: "fclass",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
        state.fclassesList = action.payload;  // ← sahi
        state.loading = false;
        state.error = null;
      },
      fetchFailed: (state, action) => {
        state.fclassesList = [];
        state.loading = false;
        state.error = action.payload;
      },
    addOrUpdateSuccess: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getDetailsSuccess: (state, action) => {
      state.fclassDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteSuccess: (state, action) => {
        state.fclassesList = state.fclassesList.filter((cls) => cls._id !== action.payload);
        state.loading = false;
        state.error = null;
      },
    resetResponse: (state) => {
      state.response = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchRequest,
  fetchSuccess,
  fetchFailed,
  addOrUpdateSuccess,
  getDetailsSuccess,
  deleteSuccess,
  resetResponse,
  clearError,
} = fclassSlice.actions;

export const fclassReducer = fclassSlice.reducer;
