import { connectToDB } from "@utils/database";
import Blog from "@models/blog";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();

    const blogs = await Blog.find().populate("creator").sort({ createdAt: -1 });

    return NextResponse.json(
      {
        StatusCode: 200,
        Message: "success",
        Values: blogs.length <= 0 ? null : blogs,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=60", // Cache for 60 seconds (adjust as needed)
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        StatusCode: 400,
        Message: error,
      },
      { status: 500 }
    );
  }
};
