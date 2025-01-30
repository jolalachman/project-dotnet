import { UserRoleEnum } from "@shared/enum";

export interface UserState {
    role: UserRoleEnum | null;
}

export const initialUserState: UserState = {
    role: null,
};
