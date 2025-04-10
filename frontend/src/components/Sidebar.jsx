import React, { useState, useEffect } from 'react';
import { Menu, X, School } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ selectedSchool, onSchoolSelect, isLoading = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(isLoading);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setIsLoadingState(true);
        const response = await fetch('http://localhost:3000/api/schools');
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error.message);
      } finally {
        setIsLoadingState(false);
      }
    };

    fetchSchools();
  }, []);

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const overlayVariants = {
    open: { opacity: 0.5, display: 'block' },
    closed: { opacity: 0, transitionEnd: { display: 'none' } }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-white bg-opacity-90 hover:bg-opacity-100 shadow-lg transition-all"
        aria-label="Open Sidebar"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full w-72 bg-neutral-800/70 shadow-xl z-50"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <School className="text-blue-600" />
                Schools
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all"
                aria-label="Close Sidebar"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-70px)] p-2">
              {isLoadingState ? (
                <div className="flex items-center justify-center h-32 text-gray-500">Loading schools...</div>
              ) : schools.length > 0 ? (
                <div className="space-y-2">
                  {schools.map((school, index) => (
                    <motion.button
                      key={school._id || index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onSchoolSelect(school);
                        setIsOpen(false);
                      }}
                      className="block w-full p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-left"
                    >
                      <span className="font-medium">{school}</span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-500">No schools found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
