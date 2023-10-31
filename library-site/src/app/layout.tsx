import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import * as React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export const MenuHamburger: React.FC = () => (
  <div className="menu">
    <button className="hamburgerbutton" id="hamburger" type="button">
      Menu
    </button>
    <div className="menu-column" id="menu-column" style={{ display: 'none' }}>
      <a href="/" className="menu-link">Accueil</a>
      <a href="/authors" className="menu-link">Auteurs</a>
      <a href="/books" className="menu-link">Livres</a>
      <a href="/" className="menu-link">Utilisateurs (temp)</a>
    </div>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('hamburger').addEventListener('click', function() {
            var menu = document.getElementById('menu-column');
            if (menu) {
              menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';
            }
          });
        `,
      }}
    />
  </div>
);
