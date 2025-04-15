import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    graduationYear: '',
    school: '',
    cclYear: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/graduation-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
      } else {
        console.error('Failed to add graduate:', response.status);
      }
    } catch (error) {
      console.error('Error adding graduate:', error);
    }
  };

  if (!isOpen) return null;

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };


  return (
      <div
          className={`filmon-graduate-add fixed inset-0 z-50 bg-neutral-800/70 flex justify-center items-center overflow-y-auto p-3 ${
              isOpen ? "visible opacity-100" : "invisible opacity-0"
          } transition-opacity duration-300`}
          onClick={handleClose}
      >
          <div
              className={`max-w-[500px] w-full transform duration-300 bg-white rounded-lg ${
                  isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
              } flex justify-center items-center p-6`}
              onClick={(e) => e.stopPropagation()}
          >
              <div className="w-full">
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
          </button>
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Add Yourself</h2>
                 
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                          <input
                              type="text"
                              name="name"
                              placeholder='Name'
                              value={formData.name}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                              required
                          />
                      </div>
                      <div>
                          <input
                              type="number"
                              name="graduationYear"
                              placeholder='Graduation Year'
                              value={formData.graduationYear}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                              required
                          />
                      </div>
                      <div>
                          <input
                              type="text"
                              name="school"
                              placeholder='School'
                              value={formData.school}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                              required
                          />
                      </div>
                      <div>
                          <input
                              type="number"
                              name="cclYear"
                              placeholder='CCL Year'
                              value={formData.cclYear}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                              required
                          />
                      </div>
                      <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                      >
                          Submit
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
};

export default Modal;