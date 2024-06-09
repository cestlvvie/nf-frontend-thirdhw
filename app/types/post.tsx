export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
  }