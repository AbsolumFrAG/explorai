import { BlogPost } from "./BlogPost";

export interface BlogGridProps {
    posts: BlogPost[];
    onCardClick: (post: BlogPost) => void;
}