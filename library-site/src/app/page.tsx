import { FC, ReactElement } from 'react';
import './globals.css';
import { MenuHamburger } from './layout';

const Home: FC = (): ReactElement => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    Home page
    <MenuHamburger />
  </main>
);

export default Home;
