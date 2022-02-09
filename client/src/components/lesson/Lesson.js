import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getLesson } from '../../actions/lesson';
import Moment from 'react-moment';
import { enroll, unenroll, deleteLesson } from '../../actions/lesson';

const Lesson = (props) => {
  const [lessonDetails, setLessonDetails] = useState({
    _id: null,
    title: '',
    level: '',
    description: '',
    url: '',
    createdOn: '',
    students: [],
  });

  const { id } = useParams();

  useEffect(() => {
    props.getLesson(id);
  }, []);

  useEffect(() => {
    if (props.lesson.lesson) {
      setLessonDetails(props.lesson.lesson);
    }
  }, [props]);

  console.log('lesson id from useNavigate() => ', lessonDetails?._id);

  return props.lesson.loading ? (
    <Spinner />
  ) : (
    <div className='lesson-container container'>
      <h1>
        {lessonDetails.level}: {lessonDetails.title}
      </h1>
      <span>
        Added on <Moment format='YYYY-MM-DD'>{lessonDetails?.createdOn}</Moment> by {lessonDetails?.user}
      </span>
      <iframe
        width='560'
        height='315'
        src='https://www.youtube.com/embed/uZgN34FXNZY'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      ></iframe>
      <div className='lesson-details'>
        <div className='lesson-enrollment'>
          <button onClick={(e) => props.enroll(lessonDetails?._id)} className='auth-button'>
            Enroll
          </button>{' '}
          {lessonDetails?.user === props.auth?.payload?.user?.id && (
            <button onClick={(e) => deleteLesson(id)} className='auth-button'>
              Delete Lesson
            </button>
          )}{' '}
          <div className='lesson-description'>
            <p>{lessonDetails?.description}</p>
            {lessonDetails?.students.length > 0 && (
              <p>
                {lessonDetails?.students.length} student{lessonDetails?.students.length > 1 && 's'} enrolled.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className='lesson-docs'>
        <h1>Sample Documentation</h1>
        <p>
          This is a sample of documentation to accomodate each lesson that will be dynamic after adding the
          corresponding table.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti recusandae architecto delectus commodi,
          rendis beatae odio ratione. Voluptatum unde quae repudiandae, eum repellat molestias vero reiciendis ipsum est
          optio modi impedit porro. Repudiandae quod repellendus quasi dolor nobis voluptate! Magni culpa officiis unde
          ducimus consectetur nam, molestiae expedita corrupti illo atque explicabo in magnam, reprehenderit labore.
        </p>
        <p>
          Kdi in dolore. Labore ipsa id odit saepe eligendi. Eius consequatur at asperiores nesciunt a beatae voluptate
          nihil quam totam cum eum odio earum, vel similique, culpa ad eveniet consectetur fugiat eaque iure assumenda
          ullam. Voluptatibus incidunt in delectus saepe voluptatem maxime voluptate facere, eligendi neque molestiae
          soluta perferendis beatae odio ratione. Voluptatum unde quae repudiandae, eum repellat molestias vero
          reiciendis ipsum est optio modi impedit porro. Repudiandae quod repellendus quasi dolor nobis voluptate! Magni
          culpa officiis unde ducimus consectetur nam, molestiae expedita corrupti illo atque explicabo in magnam,
          reprehenderit labore.
        </p>
        <h2>The Right Hand</h2>
        <p>
          nihil quam totam cum eum odio earum, vel similique, culpa ad eveniet consectetur fugiat eaque iure assumenda
          ullam. Voluptatibus incidunt in delectus saepe voluptatem maxime voluptate facere, eligendi neque molestiae
          soluta perferendis beatae odio ratione. Voluptatum unde quae repudiandae, eum repellat molestias vero
          reiciendis ipsum est optio modi impedit porro. Repudiandae quod repellendus quasi dolor nobis voluptate! Magni
          culpa officiis unde ducimus consectetur nam, molestiae expedita corrupti illo atque explicabo in magnam,
          reprehenderit labore.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti recusandae architecto delectus commodi,
          asperiores quos nam? Temporibus voluptatibus dolorum necessitatibus voluptatum eligendi consequatur sapiente
          porro ex ne porro. Repudiandae quod repellendus quasi dolor nobis voluptate! Magni culpa officiis unde ducimus
          consectetur nam, molestiae expedita corrupti illo atque explicabo in magnam, reprehenderit labore.
        </p>
        <h2>The Left Hand</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti recusandae architecto delectus commodi,
          asperiores quos nam? Temporibus voluptatibus dolorum necessitatibus voluptatum eligendi consequatur sapiente
          porro ex nemo odio adipisci deleniti, iste magnam unde nostrum, quaerat quasi tenetur. Libero, cumque soluta a
          tias vero reiciendis ipsum est optio modi impedit porro. Repudiandae quod repellendus quasi dolor nobis
          voluptate! Magni culpa officiis unde ducimus consectetur nam, molestiae expedita corrupti illo atque explicabo
          in magnam, reprehenderit labore.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti recusandae architecto delectus commodi,
          asperiores quos nam? Temporibus voluptatibus dolorum necessitatibus voluptatum eligendi consequatur sapiente
          ciis unde ducimus consectetur nam, molestiae expedita corrupti illo atque explicabo in magnam, reprehenderit
          labore.
        </p>
      </div>
    </div>
  );
};

Lesson.propTypes = {
  getLesson: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  enroll: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lesson: state.lesson,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLesson, enroll, unenroll, deleteLesson })(Lesson);
