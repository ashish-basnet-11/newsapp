"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";


const page = () => {

  const router = useRouter();

  const handleLogout = async () => {
    try {

      await api.post("/auth/logout");

      router.push("/login");

      router.refresh();

    } catch (err) {
      console.error("Logout failed");
    }
  }

  return (
    <div>
      <div>
        Hello world!!
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default page