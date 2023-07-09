export const session = async () => {
  try {
    const res = await fetch("/api/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  await fetch("/api/auth/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
