import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLesson } from '../../actions/lesson';
import { Link, useNavigate } from 'react-router-dom';

const LessonForm = ({ createLesson, closeForm }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    url: '',
  });

  const { title, description, level, url } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile data submitted from form => ', formData);

    createLesson(formData);

    setFormData({ title: '', description: '', level: '', url: '' });
  };

  return (
    <div className='container crud-form-container'>
      <form>
        <h1>Create a New Lesson</h1>
        <button onClick={closeForm} className='btn-secondary btn-close'>
          <i className='fa fa-close' />
        </button>
        <label htmlFor='title'>Title:</label>
        <input type='text' name='title' value={title} onChange={(e) => onChange(e)} placeholder='Lesson Title' />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          value={description}
          onChange={(e) => onChange(e)}
          placeholder='Description'
        />
        <label htmlFor='level'>Level:</label>
        <input type='text' name='level' value={level} onChange={(e) => onChange(e)} placeholder='Level' />
        <label htmlFor='type'>Type:</label>
        <input type='text' name='url' value={url} onChange={(e) => onChange(e)} placeholder='Video URL' />
        {/* <div className='button-container'> */}
        <div className='button-container'>
          <Link to='/lessons'>
            <button
              onClick={() => setFormData({ title: '', description: '', level: '', url: '' })}
              className='btn-secondary'
            >
              Cancel
            </button>
          </Link>
          <button onClick={(e) => onSubmit(e)}>Save</button>
        </div>

        {/* </div> */}
      </form>
    </div>
  );
};

LessonForm.propTypes = {
  createLesson: PropTypes.func.isRequired,
};

export default connect(null, { createLesson })(LessonForm);
