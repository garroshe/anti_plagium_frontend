export type LoginFieldsType = {
    email: string;
    password: string;
};

export type RegisterFieldsType = {
    email: string;
    password: string;
    name: string;
    lastName: string;
    loginName: string;
    role: 'user' | 'premium' | 'admin';
};

export type UserRole = 'user' | 'premium' | 'admin';

export type UserType = {
    uid: string;
    email: string;
    loginName?: string;
    lastName?: string;
    userName?: string;
    avatar?: string;
    role?: UserRole;
    checkedTexts?: string[];
};

export type UserResponseType = {
    error: unknown | null;
    data: UserType | null;
};

export type UserPayloadType = {
    uid: string | null;
};

export type UserUpdatePayloadType = {
    uid: string;
    data: Partial<UserType>;
};

export type UserUpdateResponseType = {
    error: unknown | null;
};