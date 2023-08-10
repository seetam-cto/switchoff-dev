import '../styles/App.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#f1f1f1',
      },
      components: {
        Calendar: {
          fontFamily: 'Poppins',
          colorPrimary: '#222222'
        },
        Radio: {
          colorText: '#222222'
        }
      }
    }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
