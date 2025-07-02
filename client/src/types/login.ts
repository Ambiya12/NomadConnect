export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export interface ProfileResponse {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture?: string;
}

export interface LoginResult {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture?: string;
  };
  accessToken?: string;
  refreshToken?: string;
}
