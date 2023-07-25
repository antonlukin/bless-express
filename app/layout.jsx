import Script from 'next/script'
import './globals.scss'

export const metadata = {
  metadataBase: new URL('https://bless.express'),
  title: 'Blessed Not Depressed by Tiger Soda',
  description: 'It’s time to get rid of shame and start a guilt-free life! Let us save your sanity with the ancient technique of ‘Indulgence’, which first appeared in Europe more than 1,000 years ago.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4HKMF1SW0C"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-4HKMF1SW0C');
      `}
      </Script>
    </html>
  )
}
