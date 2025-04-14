import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CommentBox = (params) => {
  const { schoolId } = params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!schoolId) {
      setError('School ID is missing');
      return;
    }

    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/api/schools/${schoolId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          setError('Failed to fetch comments');
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        setError('Error fetching comments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [schoolId]);

  const submitComment = async () => {
    if (!newComment.trim()) {
      setError('Comment text cannot be empty');
      return;
    }

    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/schools/${schoolId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: newComment }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments((prevComments) => [...prevComments, newCommentData]);
        setNewComment('');
      } else {
        setError('Failed to add comment');
      }
    } catch (error) {
      setError('Error adding comment');
    }
  };

  return (
    <div>
      <h3>Comments</h3>

      {isLoading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>{comment.commentText}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        className="border p-2 w-full mt-2"
      />

      <div className="flex justify-center">
        <button
          onClick={submitComment}
          className="mt-2 p-2 bg-blue-600 text-white rounded"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
