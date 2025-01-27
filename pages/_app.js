import '../styles/globals.css'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import { MessageProvider } from './components/MessageContext';

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '80px' }}>
      <MessageProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </MessageProvider>
    </div>
  )
}

export default MyApp
