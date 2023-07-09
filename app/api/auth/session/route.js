export const GET = async (req, res) => {
  try {
    const token = req.cookies.get("token")?.value;
    const user = JSON.parse(req.cookies.get("user")?.value);

    return new Response(JSON.stringify({ token, user }), { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
};
