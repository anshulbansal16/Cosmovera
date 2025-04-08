'use client';

import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignOutButton } from './sign-out-button';

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session.user.image || undefined} />
          <AvatarFallback>
            {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{session.user.name}</span>
          <span className="text-xs text-muted-foreground">{session.user.email}</span>
        </div>
      </div>
      <SignOutButton />
    </div>
  );
} 