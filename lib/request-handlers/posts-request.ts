import { ApiResponse, PostsRequest } from "../../types/api/types";

export async function handlePut(req: PostsRequest): Promise<ApiResponse<null>> {
  console.log("PUT /posts", req);
  return {
    isSuccess: true,
    message: "",
    data: null,
  };
}
