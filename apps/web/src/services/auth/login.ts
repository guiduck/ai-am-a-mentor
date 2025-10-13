import API from "@/lib/api";

export async function loginUser(data: { email: string; password: string }) {
  // Try creator login first
  const creatorLoginRes = await API<{ token: string }>("creators/login", {
    method: "POST",
    data,
  });

  // If creator login succeeds, return it
  if (!creatorLoginRes.error && creatorLoginRes.data?.token) {
    return creatorLoginRes;
  }

  // If creator login fails with 401 (not found), try student login
  if (creatorLoginRes.status === 401) {
    const studentLoginRes = await API<{ token: string }>("students/login", {
      method: "POST",
      data,
    });
    return studentLoginRes;
  }

  // If creator login failed for other reasons, return that error
  return creatorLoginRes;
}
