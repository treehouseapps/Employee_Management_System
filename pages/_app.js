import '../styles/globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { MessageProvider } from '../components/MessageContext';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '80px', backgroundColor: '#F5F9FA' }}>
        <MessageProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </MessageProvider>
      </div>
    </>
  )
}

export default MyApp
