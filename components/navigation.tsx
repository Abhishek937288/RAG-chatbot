"use client";
import Link from "next/link";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="border-b border-foreground/10">
      <div className="flex container h-16 items-center justify-between px-4 mx-auto">
        <Link href="/">
          <div className="text-xl font-semibold">RAG Chatbot</div>
        </Link>

        <div className="flex gap-2">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </>
          ) : (
            <>
              <Link href={"/chat"}>
                <Button variant="secondary" className="cursor-pointer">
                  Chat
                </Button>
              </Link>
              <Link href={"/upload"}>
                <Button variant="secondary" className="cursor-pointer">
                  upload
                </Button>
              </Link>
              <SignOutButton>
                <Button variant="outline" className="cursor-pointer">
                  Sign Out
                </Button>
              </SignOutButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
