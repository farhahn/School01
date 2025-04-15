import axios from 'axios';
import {
  fetchRequest,
  fetchSuccess,
  fetchFailed,
  addOrUpdateSuccess,
  getDetailsSuccess,
  deleteSuccess,
  clearError,
} from './fclassSlice.js.js';

// ✅ Get all Fclasses
export const getAllFclasses = () => async (dispatch) => {
  dispatch(fetchRequest());

  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/FclassList`);
    if (result.data.message) {
      dispatch(fetchFailed(result.data.message));
    } else {
      dispatch(fetchSuccess(result.data));
    }
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

// ✅ Get Fclass details by ID
export const getFclassDetails = (id) => async (dispatch) => {
  dispatch(fetchRequest());

  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Fclass/${id}`);
    if (result.data) {
      dispatch(getDetailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

// ✅ Create Fclass
export const createFclass = (data) => async (dispatch) => {
  dispatch(fetchRequest());

  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/FclassCreate`, data);
    dispatch(addOrUpdateSuccess(result.data));
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

// ✅ Update Fclass
export const updateFclass = (id, data) => async (dispatch) => {
  dispatch(fetchRequest());

  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/Fclass/${id}`, data);
    dispatch(addOrUpdateSuccess(result.data));
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

// ✅ Delete Fclass
export const deleteFclass = (id) => async (dispatch) => {
  dispatch(fetchRequest());

  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/Fclass/${id}`);
    dispatch(deleteSuccess(id)); // 👈 id pass kar
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

// ✅ Clear Errors (optional utility)
export const clearFclassError = () => (dispatch) => {
  dispatch(clearError());
};
