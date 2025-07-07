export interface User {
    _id: string;
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    bio?: string;
  }
  
  export interface Comment {
    user?: User | string;
    comment: string;
    date: string;
    _id: string;
  }
  
  export interface TravelTip {
    _id: string;
    title: string;
    description: string;
    created_by: User;
    createdAt: string;
    likes: string[];
    comments: Comment[];
  }
  
  export interface CreateTravelTipPayload {
    title: string;
    description: string;
  }