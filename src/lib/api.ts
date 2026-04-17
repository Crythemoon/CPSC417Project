export async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem("token");
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (res.status === 401) {
    const user = localStorage.getItem("user");
    const role = user ? JSON.parse(user).role : null;
    window.location.href = role === "employee" || role === "manager"
      ? "/employee/login"
      : "/login";
    throw new Error("Unauthorized");
  }
  return res.json();
}
