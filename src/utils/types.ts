export interface articleType {
  authorId: string;
  title: string;
  location: string;
  description: string;
  rating: number;
  isPublic: boolean;
  image: string;
}

export interface paramsType {
  artc?: string;
  uxr?: string;
  cmt?: string
}


export interface filterQ {
  location?: string;
}

export interface bodyType extends paramsType {
  desc: string;
}