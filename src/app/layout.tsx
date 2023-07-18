import { Roboto } from 'next/font/google'
import Navbar from '@components/Navbar'
import { Box } from '@mui/material'
import Providers from './providers'
import ThemeRegistry from './ThemeRegistry'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap'
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={roboto.className}>
      <Box
        component="body"
        display="flex"
        flexDirection="column"
        height="100vh"
      >
        <Providers>
          <ThemeRegistry options={{ key: 'mui' }}>
            <Navbar />
            <Box flexGrow={1}>{children}</Box>
          </ThemeRegistry>
        </Providers>
      </Box>
    </html>
  )
}

export default RootLayout
