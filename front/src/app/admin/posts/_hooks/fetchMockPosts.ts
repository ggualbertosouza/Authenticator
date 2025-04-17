import { mockPosts } from "../../../../../mockData";

type FetchMockPostsParams = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  category?: string;
};

export const fetchMockPosts = async ({
  page = 1,
  limit = 10,
  search = "",
  orderBy,
  category,
}: FetchMockPostsParams) => {
  const start = (page - 1) * limit;
  const end = start + limit;

  let filtered = [...mockPosts];

  if (search) {
    filtered = filtered.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (category) {
    filtered = filtered.filter((post) => post.category === category);
  }

  if (orderBy === "title") {
    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (orderBy === "newest") {
    filtered = filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  const paginated = filtered.slice(start, end);

  return {
    data: paginated,
    hasNextPage: end < filtered.length,
  };
};
