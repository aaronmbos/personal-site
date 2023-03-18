import Head from "next/head";
import Layout from "../../components/layout";

export default function Login() {
  return (
    <>
      <Head>
        <title>Aaron Bos - Login</title>
      </Head>
      <Layout>
        <div className="w-1/2 mx-auto">
          <form method="post" action="/api/login">
            <div>
              <label htmlFor="username" className="block">
                Username
              </label>
              <input
                name="username"
                className="my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
                type="text"
              ></input>
            </div>
            <div>
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                name="password"
                className="my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
                type="text"
              ></input>
              <button className="px-10 flex shrink items-center justify-center text-white dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-gray-500 w-11 h-11 my-5 hover:border-0 hover:ring-2 dark:ring-stone-400">
                Login
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
