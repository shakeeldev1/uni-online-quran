import React from 'react'
import Hero from '../components/contact/Hero';
import MapEmbed from '../components/contact/MapEmbed';
import Lenis from 'lenis'

const Contact = () => {
  const lenis = new Lenis({
    autoRaf:true,
  })
  return (
    <div>
        <Hero/>
        <MapEmbed/>
    </div>
  )
}

export default Contact;