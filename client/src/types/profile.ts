export interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture?: string;
  bio?: string;
}

export interface UserStats {
  totalDestinations: number;
  totalLikes: number;
}

export interface PublicUserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  bio?: string;
}