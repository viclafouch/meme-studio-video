import { Roboto } from 'next/font/google'
import ThemeRegistry from '@/app/ThemeRegistry'
import Navbar from '@components/Navbar'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap'
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <Navbar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}

export default RootLayout
