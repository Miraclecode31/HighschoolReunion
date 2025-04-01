import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [graduates, setGraduates] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school.name);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <Sidebar
        schools={schools}
        selectedSchool={selectedSchool}
        onSchoolSelect={handleSchoolSelect}
        isLoading={false}
      />
    </div>
  );
};

export default HomePage;
