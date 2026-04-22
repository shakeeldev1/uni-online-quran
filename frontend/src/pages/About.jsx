import React from 'react'
import Hero from '../components/about/Hero';
import Intro from '../components/about/Intro';
import Mission from '../components/about/Mission';
import Vision from '../components/about/Vision';
import Testomonial from '../components/about/Testomonial';
import Lenis from "lenis"

import MoveTo from '../components/about/MoveTo';
import TeachingMethod from '../components/about/TeachingMethod';

const About = () => {
    const lenis=new Lenis({
        autoRaf:true
    })
  return (
    <div>
        <Hero/>
        <Intro/>
        <TeachingMethod/>
        <Mission/>
        <Vision/>
        <Testomonial/>
        <MoveTo/>
    </div>
  )
}

export default About;