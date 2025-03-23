import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibrarians } from '../../redux/userRelated/userHandle';
import { CircularProgress } from '@mui/material';


const LibrariansList = () => {
  const dispatch = useDispatch();
  const { librarians, status, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchLibrarians());
  }, [dispatch]);

  return (
    <div className="librarians-container">
      <h2>All Librarians</h2>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
      {status === 'succeeded' && librarians.length > 0 ? (
        <ul>
          {librarians.map(librarian => (
            <li key={librarian._id}>
              <strong>{librarian.name}</strong> - {librarian.email}
            </li>
          ))}
        </ul>
      ) : (
        status === 'succeeded' && <p>No librarians found.</p>
      )}
    </div>
  );
};

export default LibrariansList;
