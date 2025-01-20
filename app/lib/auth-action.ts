'use server';

import { signIn, signOut } from './auth';

export async function SignInGoogle() {
  return await signIn('google');
}

export async function SignInGithub() {
  return await signIn('github');
}

export async function SignInZoom() {
  return await signIn('zoom');
}

export async function SignOut() {
  return await signOut();
}
