import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>&lt;Aaron Bos &#47;&gt;</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="py-2 border-2 border-red-400">
        <div className="flex mx-auto px-2 sm:px-6 lg:px-12">
          <div className="flex-none px-2 border-2 border-green-400">
            &lt;Aaron Bos &#47;&gt;
          </div>
          <div className="px-3 flex flex-grow border-2 border-pink-400 justify-end">
            <div className="mx-2 flex-initial px-2 border-2 border-blue-400">
              Blog
            </div>
            <div className="mx-2 flex-initial px-2 border-2 border-blue-400">
              About
            </div>
          </div>
        </div>
      </nav>

      <main>
        
      </main>

      <footer>
        
      </footer>
    </div>
  )
}
