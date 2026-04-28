"use client";

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
        <div className="text-xl font-semibold">RAG Chatbot</div>

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
            <SignOutButton>
              <Button variant="outline">Sign Out</Button>
            </SignOutButton>
          )}
        </div>
      </div>
    </nav>
  );
};