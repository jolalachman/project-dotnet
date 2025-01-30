import { createAction, props } from '@ngrx/store';
import { UserRoleEnum } from '@shared/enum';

export const setRole = createAction(
    '[Map] Set Role',
    props<{ role: UserRoleEnum | null }>()
);


export const UserActions = {
    setRole
};