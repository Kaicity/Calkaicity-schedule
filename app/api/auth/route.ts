import { authConfig, nylas } from '@/app/lib/nylas';
import { redirect } from 'next/navigation';

export async function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: authConfig.clientId,
    redirectUri: authConfig.redirectUri,
  });

  return redirect(authUrl);
}
