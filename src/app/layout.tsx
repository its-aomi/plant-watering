import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlantW",
  description: "Dashboard of plant watering",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user;
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          {user && (
            <div className="navbar bg-base-100">
              <div className="flex-1">
                <a className="btn btn-ghost text-xl" href="/">
                  PlantW
                </a>
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.picture}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li className="p-2 text-gray-500">{user?.name}</li>
                    <li className="p-2 text-gray-500">{user?.email}</li>
                    <li>
                      <a href="/settings">Settings</a>
                    </li>
                    <li>
                      <a className="text-red-500" href="/api/auth/logout">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {children}
          <Analytics />
        </body>
      </UserProvider>
    </html>
  );
}
