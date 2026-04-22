import React, { useState } from "react";
import CourseHeader from "./coursesPage/CoursesHeader";
import CourseSummaryCards from "./coursesPage/CoursesCards";
import CourseTable from "./coursesPage/CoursesMain";

function CoursesPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCourseAdded = (newCourse) => {
    // Trigger a refresh of the table
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <CourseHeader
        onCourseAdded={handleCourseAdded}
        onRefresh={handleRefresh}
      />
      <CourseSummaryCards />
      <CourseTable key={refreshTrigger} onCourseAdded={handleCourseAdded} />
    </div>
  );
}

export default CoursesPage;
