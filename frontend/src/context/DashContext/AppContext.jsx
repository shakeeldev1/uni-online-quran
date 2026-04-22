import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  // Sample state (replace with API calls later if needed)
  const [users, setUsers] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Simulate fetching data (could be API requests)
  useEffect(() => {
    setUsers([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);

    setTutors([
      { id: 1, name: "Dr. Smith" },
      { id: 2, name: "Prof. John" },
    ]);

    setCourses([
      { id: 1, title: "Mathematics 101" },
      { id: 2, title: "Science Basics" },
      { id: 3, title: "History of Art" },
    ]);

    setReviews([
      { id: 1, user: "Alice", rating: 5 },
      { id: 2, user: "Bob", rating: 4 },
      { id: 3, user: "Charlie", rating: 3 },
    ]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        users,
        tutors,
        courses,
        reviews,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
