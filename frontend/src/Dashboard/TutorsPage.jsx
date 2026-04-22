import React, { useState } from 'react'
import TutorsHeader from './tutorsPage/TutorsHeader'
import TutorCards from './tutorsPage/TutorsCards'
import TutorTable from './tutorsPage/TutorsTable'
import TeacherApplications from './tutorsPage/TeacherApplications'

function TutorsPage() {
  const [activeTab, setActiveTab] = useState('tutors') // 'tutors' or 'applications'

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('tutors')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === 'tutors'
              ? 'bg-[#0E7C5A] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Tutors
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === 'applications'
              ? 'bg-[#0E7C5A] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Teacher Applications
        </button>
      </div>

      {activeTab === 'tutors' ? (
        <>
          <TutorsHeader />
          <TutorCards />
          <TutorTable />
        </>
      ) : (
        <TeacherApplications />
      )}
    </div>
  )
}

export default TutorsPage
