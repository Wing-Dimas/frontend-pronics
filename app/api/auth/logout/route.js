import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const response = NextResponse.next();

    response.cookies.delete("token");
    response.cookies.delete("user");

    return response;
  } catch (error) {
    return new Response("Failed to logout", { status: 500 });
  }
};
