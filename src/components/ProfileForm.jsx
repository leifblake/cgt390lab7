import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "./firebase"; // Import Firestore instance

const ProfileForm = ({ addProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData(prevState => ({
        ...prevState,
        image: e.target.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = '';
      if (formData.image) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${formData.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.image);

        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          }, 
          (error) => {
            console.error('Error uploading image: ', error);
            setError('Please try again');
            setLoading(false);
          }, 
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const profileData = {
              name: formData.name,
              email: formData.email,
              role: formData.role,
              bio: formData.bio,
              image: imageUrl
            };

            // Add form data to Firestore
            const docRef = await addDoc(collection(db, "profiles"), profileData);
            console.log("Document written with ID: ", docRef.id);

            alert('Profile saved successfully!');
            
            // Add the new profile to the state in App.jsx
            addProfile({
              ...profileData,
              id: docRef.id // Add the document ID to the profile
            });

            // Clear form
            setFormData({
              name: '',
              email: '',
              role: '',
              bio: '',
              image: null
            });
            setLoading(false);
          }
        );
      } else {
        const profileData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          bio: formData.bio,
          image: imageUrl
        };

        // Add form data to Firestore
        const docRef = await addDoc(collection(db, "profiles"), profileData);
        console.log("Document written with ID: ", docRef.id);

        alert('Profile saved successfully!');
        
        // Add the new profile to the state in App.jsx
        addProfile({
          ...profileData,
          id: docRef.id // Add the document ID to the profile
        });

        // Clear form
        setFormData({
          name: '',
          email: '',
          role: '',
          bio: '',
          image: null
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Please try again');
      setLoading(false);
    }
  };

  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%'
  };

  return (
    <div style={formStyle}>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            style={inputStyle}
            rows={4}
          />
        </div>

        <div>
          <label style={labelStyle}>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            style={inputStyle}
          />
        </div>

        {loading ? (
          <div>
            <p>Loading: {progress.toFixed(2)}%</p>
          </div>
        ) : (
          <button type="submit" style={buttonStyle}>
            Save Profile
          </button>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ProfileForm;