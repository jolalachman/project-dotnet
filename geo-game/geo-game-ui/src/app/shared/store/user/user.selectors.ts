import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const USER_FEATURE_STORE_KEY = 'user';

export const selectFeature = createFeatureSelector<UserState>(
    USER_FEATURE_STORE_KEY
);

export const selectRole = createSelector(selectFeature, (state) => state.role);

export const UserSelectors = {
    selectRole
};
