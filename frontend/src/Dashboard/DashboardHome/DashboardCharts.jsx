import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Example Data
const studentTutorData = [
  { month: "Jan", students: 300, tutors: 20 },
  { month: "Feb", students: 450, tutors: 25 },
  { month: "Mar", students: 600, tutors: 32 },
  { month: "Apr", students: 750, tutors: 40 },
  { month: "May", students: 950, tutors: 48 },
];

const courseEnrollments = [
  { course: "Tajweed", enrollments: 200 },
  { course: "Hifz", enrollments: 150 },
  { course: "Arabic", enrollments: 180 },
  { course: "Fiqh", enrollments: 120 },
  { course: "Seerah", enrollments: 220 },
];

const reviewData = [
  { name: "Excellent", value: 65 },
  { name: "Good", value: 20 },
  { name: "Average", value: 10 },
  { name: "Poor", value: 5 },
];

const DashboardCharts = () => {
  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Student & Tutor Growth */}
      <div className="bg-[#F5F7FA] p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col">
        <h3 className="text-lg font-semibold text-[#0B1324] mb-4">
          Student & Tutor Growth
        </h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={studentTutorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#0B1324" />
              <YAxis stroke="#0B1324" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#0E7C5A"
                strokeWidth={3}
                dot={{ fill: "#0E7C5A" }}
              />
              <Line
                type="monotone"
                dataKey="tutors"
                stroke="#C49C2A"
                strokeWidth={3}
                dot={{ fill: "#C49C2A" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Enrollments */}
      <div className="bg-[#F5F7FA] p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col">
        <h3 className="text-lg font-semibold text-[#0B1324] mb-4">
          Course Enrollments
        </h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseEnrollments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="course" stroke="#0B1324" />
              <YAxis stroke="#0B1324" />
              <Tooltip />
              <Bar dataKey="enrollments" fill="#967B5A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reviews Breakdown */}
      <div className="bg-[#F5F7FA] p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col">
        <h3 className="text-lg font-semibold text-[#0B1324] mb-4">
          Reviews Overview
        </h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={reviewData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {reviewData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0
                        ? "#0E7C5A"
                        : index === 1
                        ? "#C49C2A"
                        : index === 2
                        ? "#967B5A"
                        : "#0B1324"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
