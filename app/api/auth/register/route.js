// REGISTER CUSTOMER
export const POST = async (req, res) => {
  const { nama_lengkap, email, password, type } = await req.json();

  try {
    const result = await fetch(
      `${process.env.BACKEND}/api/v1/auth/user/register`,
      {
        method: "POST",
        body: JSON.stringify({ nama_lengkap, email, password, type }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await result.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed to login", { status: 500 });
  }
};
