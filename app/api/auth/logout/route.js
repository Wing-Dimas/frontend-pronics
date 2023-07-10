import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    res.setHeader("Set-Cookie", [
      serialize("token", "", {
        maxAge: -1,
        path: "/",
      }),
      serialize("user", "", {
        maxAge: -1,
        path: "/",
      }),
    ]);

    return res;
    // return new Response("Success to logout", { status: 200 });
  } catch (error) {
    return new Response("Failed to logout", { status: 500 });
  }
};
