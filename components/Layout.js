import Image from 'next/image'
import Nav from '/components/Nav'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const { data: session } = useSession()
  if(session) {
    return <>
    <div className="bg-blue-900 min-h-screen flex">
    <Nav />
    <div className="bg-white flex-grow text-black mt-2 mr-2 rounded-lg p-4 mb-2">
    {children}
    </div>
    </div>
    </>
  }
  return <>
    Not signed in <br/>
    <div className="bg-blue-900 w-screen h-screen flex items-center">
      <div className="text-center w-full">
      <button onClick={() => signIn('google')} className="bg-white p-2 px-4 text-black rounded-lg">Login With Google</button>
      </div>
    </div>
  </>
}
