'use client';
import React from 'react';
import NextLink from '../NextLink';
import { NavbarItem } from '@heroui/navbar';
import { usePathname } from 'next/navigation';
import useMessageStore from '@/hooks/useMessageStore';

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const pathName = usePathname();
  const unreadCount = useMessageStore((state) => state.unreadCount);

  return (
    <NavbarItem isActive={pathName === href} as={NextLink} href={href}>
      <span>{label}</span>
      {href === '/messages' && <span className="ml-1">({unreadCount})</span>}
    </NavbarItem>
  );
}
