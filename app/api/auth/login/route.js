import { NextResponse } from "next/server";

// LOGIN MANUAL
export const POST = async (req, res) => {
  const { email, password } = await req.json();

  try {
    const result = await fetch(
      `${process.env.BACKEND}/api/v1/auth/user/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await result.json();

    const response = NextResponse.json(
      {
        ...data,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: data.data.token,
      maxAge: 60 * 60 * 24 * 30 * 12,
    });
    response.cookies.set({
      name: "user",
      value: JSON.stringify(data.data.user),
      maxAge: 60 * 60 * 24 * 30 * 12,
    });

    return response;
  } catch (error) {
    return new Response("Failed to login", { status: 500 });
  }
};
