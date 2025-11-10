import "./globals.css";
import React from "react";

export const metadata = {
  title: "Task Tracker",
  description: "Task Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="max-w-3xl mx-auto p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">{metadata.title}</h1>
            <p className="text-zinc-600 text-sm">{metadata.description}</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}