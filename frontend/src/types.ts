export interface Artist {
  _id: string;
  name: string;
  photo: string;
}

export interface Album {
  _id: string;
  artistId: string;
  name: string;
  photo: string;
  year: number;
}

export interface Track {
  _id: string;
  albumId: string;
  trackNumber: number;
  name: string;
  duration: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}