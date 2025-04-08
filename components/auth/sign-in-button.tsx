'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function SignInButton() {
  return (
    <Button
      onClick={() => signIn('github', { callbackUrl: '/' })}
      className="flex items-center gap-2"
    >
      <Github className="h-4 w-4" />
      Sign in with GitHub
    </Button>
  );
} 