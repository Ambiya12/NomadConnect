export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  bio?: string;
}

export interface Location {
  type: string;
  coordinates: [number, number];
}

export interface Comment {
  user?: User | string;
  comment: string;
  date: string;
  _id: string;
}

export interface Destination {
  _id: string;
  name: string;
  description: string;
  images: string[];
  location: Location;
  city: string;
  country: string;
  tags: string[];
  created_by: User;
  created_at: string;
  likes: string[];
  comments: Comment[];
}

export interface CreateDestinationPayload {
  name: string;
  description: string;
  country: string;
  city: string;
  address: string;
  location: Location;
  tags: string[];
  images: File[];
}