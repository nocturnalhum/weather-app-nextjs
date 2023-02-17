import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name='description' content='Weather app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=''>
        <h1>Tailwind</h1>
      </main>
    </>
  );
}
