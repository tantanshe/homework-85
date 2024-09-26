export interface ArtistMutation {
  name: string;
  photo: string | null;
  info: string | null;
  isPublished: boolean;
}

export interface AlbumMutation {
  name: string;
  artist: string;
  year: number;
  photo: string | null;
  isPublished: boolean;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
  trackNumber: number,
  isPublished: boolean;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}