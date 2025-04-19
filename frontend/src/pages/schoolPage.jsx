import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ImageSlider from '../components/ImageSlider';
import CommentBox from '../components/commentBox';  // Importing CommentBox
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

    // Fetch graduates based on school name
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

    // Fetch all comments and filter by school
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user-comments');
        const data = await response.json();
        const filtered = data.filter(comment => comment.school === schoolName); // Filter comments for the selected school
        setComments(filtered);
        console.log('Filtered Comments:', filtered);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    // Fetch all schools (not used directly here but useful for sidebar)
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
    // Optional: Handle selecting a school (could navigate or perform other actions)
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Home Button */}
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

      {/* Comment Box */}
      <div className="relative z-20">
        <div className="absolute bottom-0 left-0 right-0">
          {/* Pass filtered comments to CommentBox */}
          <CommentBox comments={comments} />
        </div>

        {/* Graduate List */}
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
