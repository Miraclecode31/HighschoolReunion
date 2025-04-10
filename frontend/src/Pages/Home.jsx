import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import CommentBox from '../components/commentBox';
import GraduateList from '../components/GraduateList';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';

const HomePage = () => {
  const { schoolId: paramsSchoolId } = useParams(); 
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [graduates, setGraduates] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolId, setSchoolId] = useState('67f6fee746e000a802b3e3dc'); 

  useEffect(() => {
    setSchools([
      { id: '67f6fee746e000a802b3e3dc', name: 'School A' },
      { id: '67f6fee746e000a802b3e3dc', name: 'School B' },
    ]);
    setGraduates([
      { id: '1', name: 'Absara', schoolId: '67f6fee746e000a802b3e3dc' },
      { id: '2', name: 'Zebib', schoolId: '67f6fee746e000a802b3e3dc' },
    ]);
  }, []);

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school.name);
    setSchoolId(school.id);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <ImageSlider />

      <Sidebar
        schools={schools}
        selectedSchool={selectedSchool}
        onSchoolSelect={handleSchoolSelect}
        isLoading={false}
      />

      <div className="relative z-10">
        <div className="absolute bottom-0 left-0 right-0">
          <CommentBox schoolId={schoolId} />
        </div>

        <h1>Welcome to the Home Page</h1>

        <GraduateList
          graduates={graduates.filter((graduate) => graduate.schoolId === schoolId)}
          selectedSchool={selectedSchool}
          onOpenModal={() => setIsModalOpen(true)}
          isLoading={false}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
