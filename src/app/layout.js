"use client";
import { Provider } from "react-redux";
import "./globals.css";
import store from "@/redux/store";

// Define a local font

// Fetch locale and messages on the server side
export default async function RootLayout({ children }) {
  return (
    <html>
      <body className={` antialiased font-Inter`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
