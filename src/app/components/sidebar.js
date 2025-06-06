'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, ListItemButton, ListItemText } from '@mui/material';

export default function Sidebar() {
  const pathname = usePathname();

  const tabs = [
    { label: "Home", href: "/" },
    { label: "Drivers by Year", href: "/drivers" },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        width: 256,
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: '#f0f0f0',
        paddingTop: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <List>
        {tabs.map(({ label, href }) => (
          <ListItemButton
            key={href}
            component={Link}
            href={href}
            selected={pathname === href}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </nav>
  );
}
