export interface AuthMethods {
    googleAuth?: () => Promise<any>;
}

export interface User {
    name: string;
    email: string;
    user_id: string;
    picture: string;
}