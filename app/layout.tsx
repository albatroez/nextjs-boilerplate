import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Droplo exercise",
    description: "Written by Jakub Zieliński",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <main className={"max-w-6xl p-2 mx-auto"}>{children}</main>
            </body>
        </html>
    );
}
