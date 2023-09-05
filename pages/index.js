import Layout from '/components/Layout'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()
  if(session) {
  return(
      <Layout>
        <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session.user.email}</b>
        </h2>
        <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
          <img src={session.user.image} className="w-6 h-6" />
          <span className="px-2">
            <button onClick={() => signOut()}>Sign out</button>
          </span>
        </div>
        </div>
      </Layout>
    );
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
