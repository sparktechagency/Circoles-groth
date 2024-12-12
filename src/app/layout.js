

import "./globals.css";


// Define a local font



// Fetch locale and messages on the server side
export default async function RootLayout({ children }) {
  


  return (
    <html >
      <body className={` antialiased font-Inter`}>
       {children}
      </body>
    </html>
  );
}
