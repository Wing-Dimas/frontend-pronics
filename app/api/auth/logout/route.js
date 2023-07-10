import { cookies } from "next/headers";

export const POST = async (req, res) => {
  try {
    cookies().set({
      name: "token",
      value: "",
      maxAge: 0,
      path: "/",
    });
    cookies().set({
      name: "user",
      value: "",
      maxAge: 0,
      path: "/",
    });

    return new Response("Suscces", {
      status: 200,
      headers: { "Set-Cookie": "token=;user=;Max-Age=0" },
    });
  } catch (error) {
    return new Response("Failed to logout", { status: 500 });
  }
};
