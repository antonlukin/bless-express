import './globals.scss'

export const metadata = {
  title: 'Blessed Not Depressed by Tiger Soda',
  description: 'It’s time to get rid of shame and start a guilt-free life! Let us save your sanity with the ancient technique of ‘Indulgence’, which first appeared in Europe more than 1,000 years ago.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
