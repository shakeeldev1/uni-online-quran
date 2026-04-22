import React from 'react'
import NoraaniQaida from '../components/CoursesLine/NoraniQaida'
import MadaniQaida from '../components/CoursesLine/MadaniQaida'
import NazraQuran from '../components/CoursesLine/NazraQuran'
import NamazDua from '../components/CoursesLine/NamazDua'
import BasicIslamic from '../components/CoursesLine/BasicIslamic'
import ScienceObligatory from '../components/CoursesLine/ScienceObligatory'

const Course = () => {
  return (
    <div>
      <NoraaniQaida/>
      <MadaniQaida/>
      <NazraQuran/>
      <NamazDua/>
      <BasicIslamic/>
      <ScienceObligatory/>
    </div>
  )
}

export default Course
