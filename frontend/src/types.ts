export interface Artist {
  _id: string;
  name: string;
  photo: string;
}

export interface Album {
  _id: string;
  artistId: string;
  title: string;
  cover: string;
  year: number;
}

export interface Track {
  _id: string;
  albumId: string;
  trackNumber: number;
  title: string;
  duration: string;
}