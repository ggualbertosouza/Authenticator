import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMockPosts } from "./fetchMockPosts";

export type Post = {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
};

type FetchMockPostsParams = {
  page: number;
  limit: number;
  search?: string;
  orderBy?: "title" | "newest";
  category?: string;
};

export const usePosts = (params: FetchMockPostsParams) => {
  return useInfiniteQuery(
    ["posts", params],
    async ({ pageParam = 1 }) => {
      const { data, hasNextPage } = await fetchMockPosts({
        page: pageParam,
        limit: params.limit,
        search: params.search,
        orderBy: params.orderBy,
        category: params.category,
      });

      return { data, hasNextPage };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.data.length + 1 : undefined,
    },
  );
};
