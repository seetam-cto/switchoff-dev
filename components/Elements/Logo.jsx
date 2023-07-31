import React from 'react'
import { logoState } from '@/templates/Hero'
import { useAtom } from 'jotai'
import luxury from '../../assets/images/luxury.png'
import experiential from '../../assets/images/experiential.png'
import { motion } from 'framer-motion'

const Logo = () => {
    const [logo, setLogo] = useAtom(logoState)
    return (
        <>
        <motion.div
        initial={{scale: .8}}
        whileHover={{scale: .9}}
        className="logo" style={{
            backgroundImage: `url(${logo ? luxury.src : experiential.src})`,
            }}
        onClick={() => setLogo(!logo)}
        >
            <div className="logo-thumb" style={{transform: `translateX(${logo ? '0px' : '70px'})`}}/>
        </motion.div>
        </>
    )
}

export default Logo