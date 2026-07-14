"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-[#a09990] hover:text-rose-500 hover:bg-rose-50 transition-all mt-4 text-right"
    >
      <LogOut size={16} />
      خروج
    </button>
  );
}
