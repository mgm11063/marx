import { getSession } from 'next-auth/react';
import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Header from "../components/Header"
import Login from '../components/Login';



export default function Home({ session }) {
  if (!session) return <Login />
  return (
    <div className="h-screen bg-gray-100 outline-hidden">
      <Head>
        <title>Face Book</title>
      </Head>
      <Header />
      {/* Header */}
      <main className='flex'>
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
      </main>

    </div>
  )
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}