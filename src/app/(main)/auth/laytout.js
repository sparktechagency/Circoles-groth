// "use client";

import ".";
import { getLocale } from "next-intl/server";

// Fetch locale and messages on the server side
export default async function Layout({ children }) {
  return <section className={` antialiased font-Inter`}>{children}</section>;
}
