/* import type { Metadata } from 'next'; */
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import * as React from 'react';
import Image from 'next/image';
import hamburgericon from './hamburgericon.ico';

const inter = Inter({ subsets: ['latin'] });

/* export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
}; */

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
    <button className="menu-button" id="menu-button" type="button">
      <Image src={hamburgericon} alt="Menu" width={40} height={40} />
    </button>
    <div className="menu-column" id="menu-column" style={{ display: 'none' }}>
      <a href="/" className="button-column">
        Accueil
      </a>
      <a href="/authors" className="button-column">
        Auteurs
      </a>
      <a href="/books" className="button-column">
        Livres
      </a>
      <a href="/users" className="button-column">
        Utilisateurs
      </a>
    </div>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('menu-button').addEventListener('click', function() {
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
