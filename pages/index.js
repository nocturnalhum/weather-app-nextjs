import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import Search from '@/components/Search';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='relative min-h-screen bg-landscape bg-cover bg-center'>
        {/* Overlay */}
        <div className='absolute top-0 bottom-0 left-0 right-0 bg-black/50' />
        <Search />
      </main>
    </>
  );
}
