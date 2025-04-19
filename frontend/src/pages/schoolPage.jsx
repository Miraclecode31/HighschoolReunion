import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ImageSlider from '../components/ImageSlider';
import CommentBox from '../components/commentBox';
import GraduateList from '../components/GraduateList';
import Modal from '../components/Modal';
import { schoolImages } from '../constants/schoolData';
import HomeButton from '../components/homeButton';

const SchoolPage = () => {
  const { schoolName } = useParams();
  const schoolImgs = schoolImages;

  const [graduates, setGraduates] = useState([]);
  const [comments, setComments] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('School Name:', schoolName);

    const fetchSchoolData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/graduation-records/school/${encodeURIComponent(schoolName)}`);
        const data = await response.json();
        setGraduates(data);
        console.log('Graduates:', data);
      } catch (error) {
        console.error('Error fetching graduates:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user-comments');
        const data = await response.json();
        const filtered = data.filter(comment => comment.school === schoolName);
        setComments(filtered);
        console.log('Filtered Comments:', filtered);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/graduation-records');
        const data = await response.json();
        setSchools(data);
        console.log('Schools:', data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchoolData();
    fetchComments();
    fetchSchools();
  }, [schoolName]);

  const handleSchoolSelect = (school) => {
    // Optional: Handle selecting a school
  };

  return (
    <div className="relative h-screen overflow-hidden">

      {/* Home Button as its own component */}
      <HomeButton />

      {/* Image Slider */}
      <div className="relative top-0 left-0 right-0 z-10">
        <ImageSlider images={schoolImgs[schoolName]} />
      </div>

      {/* Sidebar */}
      <div className="relative z-20">
        <Sidebar
          schools={schools}
          selectedSchool={schoolName}
          onSchoolSelect={handleSchoolSelect}
          isLoading={false}
        />
      </div>

      {/* Comment Box and Graduate List */}
      <div className="relative z-20">
        <div className="absolute bottom-0 left-0 right-0">
          <CommentBox />
        </div>

        <GraduateList
          graduates={graduates}
          selectedSchool={schoolName}
          onOpenModal={() => setIsModalOpen(true)}
          isLoading={false}
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SchoolPage;
