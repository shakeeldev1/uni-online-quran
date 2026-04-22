import React, { useState } from "react";
import { FaCheckCircle, FaPlus, FaUserPlus } from "react-icons/fa";

const ActionButton = ({ color, icon, label, onClick, extraClasses }) => (
  <button
    className={`w-full inline-flex items-center justify-between gap-3 px-3 sm:px-4 py-3 rounded-xl text-white shadow hover:shadow-lg transition-transform hover:-translate-y-0.5 ${extraClasses}`}
    style={{ background: color }}
    onClick={onClick}
    aria-label={label}
  >
    <span className="inline-flex items-center gap-3">
      {icon}
      {label}
    </span>
  </button>
);

function QuickActions() {
  const [showAddTutor, setShowAddTutor] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);

  return (
    <div className="rounded-2xl px-4 sm:px-5 pt-4 sm:pt-5 pb-3 min-w-0 self-start border border-green-800">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 md:gap-3">
        <ActionButton
          color="#0E7C5A"
          icon={<FaPlus className="text-white/90" />}
          label="Add Course"
          onClick={() => setShowAddCourse(true)}
        />
        <ActionButton
          color="#2C3E50"
          icon={<FaUserPlus className="text-white/90" />}
          label="Add Tutor"
          onClick={() => setShowAddTutor(true)}
        />
        <ActionButton
          color="#967B5A"
          icon={<FaCheckCircle className="text-white/90" />}
          label="Approve Trials"
          onClick={() => alert("Trial requests approved!")}
          extraClasses="sm:col-span-2 md:col-span-1"
        />
      </div>
    </div>
  );
}

export default QuickActions;
