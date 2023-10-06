import Hero from '@/templates/Hero'
import Head from 'next/head'
import Image from 'next/image'
import herobg from '../assets/images/bg.png'
import Header from '@/templates/Header'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic';
const DynamicModal = dynamic(() => import('@/templates/Property/PropertyModal'), { ssr: false });
import { atom, useAtom } from 'jotai'
import Destinations from '@/templates/Sections/Destinations'
import SubscribeModal from '@/templates/Header/SubscribeModal'
import { getHomePageContent } from '@/api/hygraph'
import { BrowserView, MobileView} from 'react-device-detect'
import Footer from '@/templates/Footer/Footer'

//global states
export const propertyModalState = atom({
  open: false,
  propertyId: '',
  hotelId: ''
})

export const getPropetyModalState = atom((get) => get(propertyModalState))

export default function Home({data}) {
  return (
    <>
      <Head>
        <title>SwitchOff | Redefining the way, you search and stay</title>
        <meta name="description" content="Redefining the way, you search and stay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <img src={herobg.src} className='temp' /> */}
        <BrowserView>
        <AnimatePresence>
          <Header />
          <Hero />
          <div className="home-sections">
            <Destinations data={data} />
          </div>
          <Footer />
          <DynamicModal />
          <SubscribeModal />
        </AnimatePresence>
        </BrowserView>
        <MobileView>
          <div>
          <h2>This Website is in Test mode and Only available on Desktop Browsers.</h2>
          </div>
        </MobileView>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const homepage = await getHomePageContent()
  return {
    props: {
      data: homepage
    }
  }
}
