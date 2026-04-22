import React from 'react'
import QuranMemoHeader from './QuranMemorization/QuranMemoHeader'
import HifzFeatures from './QuranMemorization/HifzFeatures'
import IjazahSection from './QuranMemorization/IjazahSection'
import HifzOverviewSection from './QuranMemorization/HifzOverviewSection'

export default function QuranMemorization() {
  return (
    <div>
      <QuranMemoHeader/>
      <HifzFeatures/>
      <IjazahSection/>
      <HifzOverviewSection/>
    </div>
  )
}
