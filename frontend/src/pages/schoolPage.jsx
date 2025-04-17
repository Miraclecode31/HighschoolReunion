import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar';
import ImageSlider from '../components/ImageSlider';
import CommentBox from '../components/commentBox';
import GraduateList from '../components/GraduateList';
import Modal from '../components/Modal';

const SchoolPage = () => {
  const { schoolName } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  console.log("School name from URL:", schoolName);
  const [graduates, setGraduates] = useState([]);
  const [comments, setComments] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch school data and comments when the component mounts
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/graduation-records/school/${encodeURIComponent(schoolName)}`);
        const data = await response.json();
        console.log('Fetched graduates data:', data);
        setGraduates(data);
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
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/graduation-records');
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchoolData();
    fetchComments();
    fetchSchools();
  }, [schoolName]);

  const handleSchoolSelect = (school) => {
    // Handle selecting a school (could use for other purposes)
  };

  // Function to handle navigating back to home page
  const goToHomePage = () => {
    navigate('/'); // Navigate to the home page ("/")
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Home Button */}
      <button
        onClick={goToHomePage}
        className="absolute top-4 left-4 p-2 bg-blue-600 text-white rounded-full"
      >
        Home
      </button>


      {/* Sidebar */}
      <Sidebar
        schools={schools}
        selectedSchool={schoolName}
        onSchoolSelect={handleSchoolSelect}
        isLoading={false}
      />

      <div className="relative z-10">
        <div className="absolute bottom-0 left-0 right-0">
          <CommentBox />
        </div>

         {/* ImageSlider */}
      <ImageSlider />

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
