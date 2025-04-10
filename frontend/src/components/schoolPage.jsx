import React from 'react';
import { useParams } from 'react-router-dom';
import CommentBox from './commentBox';

const SchoolPage = () => {
  const { schoolId } = useParams(); 

  return (
    <div>
      <h1>Welcome to School {schoolId}</h1>
      <CommentBox /> 
    </div>
  );
};

export default SchoolPage;
