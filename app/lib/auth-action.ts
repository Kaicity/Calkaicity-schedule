'use server';
import { auth, signIn, signOut } from './auth';

export async function SignInGoogle() {
  return await signIn('google');
}

export async function SignInGithub() {
  return await signIn('github');
}

export async function SignOut() {
  return await signOut();
}

export async function Auth() {
  return await auth();
}
