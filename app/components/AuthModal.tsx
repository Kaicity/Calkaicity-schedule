"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { SignInGithub, SignInGoogle } from "../lib/auth-action";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButton";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for free</Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader className="flex flex-row items-center gap-2">
          <Image src={Logo} alt="" className="size-10" />
          <DialogTitle asChild>
            <h4 className="text-3xl font-semibold">
              Cal<span className="text-primary">kaicity</span>
            </h4>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          {/* Đăng nhập với Google */}
          <form className="w-full" action={() => SignInGoogle()}>
            <GoogleAuthButton />
          </form>

          {/* Đăng nhập với Github */}
          <form className="w-full" action={() => SignInGithub()}>
            <GithubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
