
import { Role } from '@/constants/auth.constant';
import { checkRoleRedirect } from '@/utils/redirect';
import { redirect } from 'next/navigation';
import React from 'react';

function Home() {
  redirect(checkRoleRedirect(Role.ADMIN));
}

export default Home