import { ApiResponse, PostsRequest } from "../../types/api/types";

export async function handlePut(req: PostsRequest): Promise<ApiResponse<null>> {
  return {
    isSuccess: true,
    message: "",
    data: null,
  };
}
