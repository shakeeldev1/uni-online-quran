import { useState } from "react";
import { UserPlus, BookOpen, GraduationCap, X } from "lucide-react";
import AddTutorForm from "./forms/AddTutorForm";
import AddStudentForm from "./forms/AddStudentForm";
import AddCourseForm from "./forms/AddCourseForm";

export default function QuickActions() {
  const [openForm, setOpenForm] = useState(null);

  const actions = [
    {
      title: "Add Tutor",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "bg-[#0E7C5A] hover:bg-[#0C664A]",
      form: "tutor",
    },
    {
      title: "Add Student",
      icon: <UserPlus className="w-5 h-5" />,
      color: "bg-[#0B1324] hover:bg-[#1E293B]",
      form: "student",
    },
    {
      title: "Add Course",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-[#C49C2A] hover:bg-[#967B5A]",
      form: "course",
    },
  ];

  return (
    <section className="mt-10">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 relative inline-block mb-4">
        Quick Actions
        <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
      </h1>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => setOpenForm(action.form)}
            className={`${action.color} text-white px-5 py-3 rounded-lg flex items-center gap-2 shadow-md transition transform hover:scale-105`}
          >
            {action.icon}
            <span className="font-medium">{action.title}</span>
          </button>
        ))}
      </div>

      {/* Modal */}
      {openForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenForm(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {openForm === "tutor" && (
              <AddTutorForm onClose={() => setOpenForm(null)} />
            )}
            {openForm === "student" && (
              <AddStudentForm onClose={() => setOpenForm(null)} />
            )}
            {openForm === "course" && (
              <AddCourseForm onClose={() => setOpenForm(null)} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
