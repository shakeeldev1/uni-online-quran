import React from 'react'
import Header from '../components/home/Header'
import QuranLearningSteps from '../components/home/QuranLearningSteps'
import WhyChooseUs from '../components/home/WhyChooseUs'
import KeyFeatures from '../components/home/KeyFeatures'
import ProgressStats from '../components/home/ProgressStat'
import QuranCourses from '../components/home/QuranCourses'
import OurValueSection from '../components/home/OurValueSection'
import FAQSection from '../components/home/FAQSectin'
import ReviewPage from '../components/home/ReviewPage'

import Lenis from 'lenis'


const Home = () => {
  const lenis = new Lenis({
    autoRaf: true,
  })
  return (
    <div>
      <Header />
      <QuranLearningSteps />
      <KeyFeatures />
      <OurValueSection />
      <WhyChooseUs />
      <ProgressStats />
      <QuranCourses />
      <FAQSection />
      <ReviewPage />
    </div>
  )
}

export default Home