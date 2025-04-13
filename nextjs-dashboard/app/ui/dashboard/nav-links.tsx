'use client';
import {
  HomeIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  {
    name: 'Generator',
    href: '/dashboard/generator',
    icon: ArrowPathIcon,
  },
  {
    name: 'About',
    href: '/dashboard/about',
    icon: DocumentDuplicateIcon,
  }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-[rgb(245,214,144)] p-3 text-sm font-medium hover:bg-[rgb(213,187,126)] hover:text-black md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-[rgb(213,187,126)] text-black': pathname === link.href,
                },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
