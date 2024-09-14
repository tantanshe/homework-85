import {User, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {register} from './usersThunks';

interface UserState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerLoading = false;
      })
      .addCase(register.rejected, (state, {payload: error}) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
  },
});

export const usersReducer = usersSlice.reducer;

export const {
  selectUser,
  selectRegisterLoading,
  selectRegisterError,
} = usersSlice.selectors;