import './global.css';

export const metadata = {
  title: 'E-Pharma',
  description: 'Online pharamcy system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        {children}</body>
    </html>
  )
}
