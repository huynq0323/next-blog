
import { AUTH, Role } from '@/constants/auth.constant';
import { checkRoleRedirect } from '@/utils/redirect';
import { cookie } from '@/utils/universal-cookie';
import { redirect } from 'next/navigation';
import React from 'react';

async function Home() {
  const role = await cookie.get(AUTH.ROLE);
  redirect(checkRoleRedirect(role as Role));
}

export default Home