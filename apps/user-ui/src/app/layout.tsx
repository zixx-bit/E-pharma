import { Header } from '../shared/widgets/header';
import './global.css';
import { Poppins, Roboto } from 'next/font/google';

export const metadata = {
  title: 'E-Pharma',
  description: 'Online pharamcy system',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 ${poppins.variable} ${roboto.variable}`}>
        <Header />
        {children}</body>
    </html>
  )
}
