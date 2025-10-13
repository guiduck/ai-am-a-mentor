import API from "@/lib/api";

export async function registerUser(data: {
  email: string;
  password: string;
  username: string;
}) {
  return await API<{ message: string; user: any }>("creators/register", {
    method: "POST",
    data,
  });
}
