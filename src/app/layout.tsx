import './globals.scss'

export const metadata = {
  title: 'Scrollarium',
  description: 'Scrollarium: A World-building app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
