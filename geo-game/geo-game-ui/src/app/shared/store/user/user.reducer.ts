import { createReducer, on } from '@ngrx/store';
import { setRole } from './user.actions';
import { initialUserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  on(setRole, (state, { role }) => ({
    ...state,
    role
  })),
);
