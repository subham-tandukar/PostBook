import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

export const GET = async (req) => {
  try {
    await connectToDB();

    const blogs = await Blog.find().populate("creator").sort({ createdAt: -1 });;

    return new Response(JSON.stringify(blogs), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all blogs", { status: 500 });
  }
};
