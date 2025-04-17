import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "../_hooks/usePosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PostCardProps = {
  post: Post;
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onView,
  onEdit,
  onDelete,
}) => {
  const [showAllTags, setShowAllTags] = React.useState(false);
  const visibleTags = showAllTags ? post.tags : post.tags.slice(0, 5);

  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.summary}
        </p>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="text-sm text-muted-foreground line-clamp-3">
          {post.content}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {visibleTags.map((tag, idx) => (
            <Badge key={idx} variant="secondary">
              {tag}
            </Badge>
          ))}

          {post.tags.length > 5 && (
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => setShowAllTags(!showAllTags)}
            >
              {showAllTags ? "ver menos" : `+${post.tags.length - 5}`}
            </button>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between mt-4">
        <span className="text-sm text-muted-foreground">{post.category}</span>

        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => onView(post)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onEdit(post)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onDelete(post)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
