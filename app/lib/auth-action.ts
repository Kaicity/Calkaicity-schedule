"use server";
import { signIn } from "./auth";

export async function SignInGoogle() {
  return await signIn("google");
}

export async function SignInGithub() {
  return await signIn("github");
}
