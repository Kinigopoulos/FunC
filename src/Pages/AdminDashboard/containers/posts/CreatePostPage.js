import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostForm from "../../components/posts/PostForm";
import Validate from "../../components/form/Validate";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";

const CreatePostPage = ({ errors, createPost, loading, history }) => {
   const [post, setPost] = useState({
      title: "",
      titleGR: "",
      lesson: "",
      lessonGR: "",
      language: "c++",
      hasTest: false,
      lessonSummary: "",
      lessonSummaryGR: "",
      testExercise: "",
      testExerciseGR: "",
      initialCode: "",
      answer: "",
      errors: {}
   });

   useEffect(() => {
      setPost(post => {
         return { ...post, errors };
      });
   }, [errors]);

   const handleChange = e => {
      if(e.target.name === "hasTest"){
         setPost({
            ...post,
            [e.target.name]: e.target.checked
         });
         return;
      }
      setPost({
         ...post,
         [e.target.name]: e.target.value
      });
   };

   const handleBlur = e => {
      const { name, value } = e.target;
      const error = { ...post.errors, ...Validate(name, value).errors };
      setPost({ ...post, errors: { ...error } });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const { title, titleGR, lesson, lessonGR, language, hasTest, lessonSummary, lessonSummaryGR,
         testExercise, testExerciseGR, initialCode, answer } = post;
      createPost({ title, titleGR, lesson, lessonGR, language, hasTest, lessonSummary, lessonSummaryGR,
         testExercise, testExerciseGR, initialCode, answer }, history);
   };

   return (
      <PostForm
         loading={loading}
         post={post}
         onChange={handleChange}
         onBlur={handleBlur}
         onSubmit={handleSubmit}
      />
   );
};

const mapStateToProps = state => ({
   loading: state.post.postLoading,
   errors: state.errors
});

CreatePostPage.propTypes = {
   createPost: PropTypes.func.isRequired,
   errors: PropTypes.object.isRequired,
   loading: PropTypes.bool.isRequired
};

export default connect(
   mapStateToProps,
   { createPost }
)(CreatePostPage);
