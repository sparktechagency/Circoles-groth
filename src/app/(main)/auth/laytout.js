// "use client";

import '.'
import { getLocale } from "next-intl/server";

// Fetch locale and messages on the server side
export default async function RootLayout({ children }) {


  return (
    <html >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Pantagonostis</title>
      </head>
      <body className="antialiased font-Inter">
        {/* Internationalization wrapper */}
        {children}

      </body>
    </html>
  );
}


