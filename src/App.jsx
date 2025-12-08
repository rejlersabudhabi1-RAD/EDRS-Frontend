// Css 
import './App.css'
import '@icon/icofont/icofont.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-modal-video/css/modal-video.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import 'swiper/css/bundle';
import './assets/css/main.css'
import './assets/css/responsive.css'
import './assets/css/rejlers-theme.css'

// Components 
import Routers from './components/Routers';
import ScrollUpBtn from './components/ScrollUpBtn';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import PreLoader from './components/PreLoader';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function App() {

  //  Preloader 
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <HelmetProvider>
      {isLoading ? <PreLoader /> :
        <div>
          <Helmet>
            <title>Rejlers || Home of the Learning Minds - Engineering Excellence</title>
            <link rel="shortcut icon" href="../public/favicon.ico"></link>
          </Helmet>
          <Routers />
          <ScrollUpBtn />
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      }
    </HelmetProvider>
  )
}

export default App
