import Nav from "../components/nav";
import Footer from "../components/footer";
import MetaSocial from "../components/meta-social";
import { ReactNode } from "react";
import { User } from "../types/api/types";

interface Props {
  children?: ReactNode;
  user?: User;
  isWide?: boolean;
}

export default function Layout({ children, user, isWide }: Props) {
  return (
    <>
      <div className="flex flex-col min-h-screen w-screen overflow-auto bg-gray-50 dark:bg-stone-800 dark:text-white">
        <Nav user={user} />
        <main
          className={`w-full pt-8 max-w-screen-lg mx-auto px-10 ${
            isWide ? "" : "md:px-28 "
          }grow dark:bg-stone-800 dark:text-white`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
