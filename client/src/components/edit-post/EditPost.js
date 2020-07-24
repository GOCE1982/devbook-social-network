import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { updatePost, getPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (prevProps.post !== this.props.post) {
      const { post } = this.props.post;

      post.text = !isEmpty(post.text) ? post.text : "";
      post.name = !isEmpty(post.name) ? post.name : "";
      post.avatar = !isEmpty(post.avatar) ? post.avatar : "";
      post.user = !isEmpty(post.user) ? post.user : "";
      post.likes = !isEmpty(post.likes) ? post.likes : [];
      post.comments = !isEmpty(post.comments) ? post.comments : [];

      this.setState({ text: post.text });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { auth } = this.props;
    const postId = this.props.match.params.id;

    const newPost = {
      text: this.state.text,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    this.props.updatePost(postId, newPost, this.props.history);
    this.setState({ text: "" });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    const { post } = this.props.post;

    return (
      <div className="post-form mb-3">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="">
          <div className="card card-info">
            <div className="card-header bg-info text-white">Edit your post</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Update post"
                    name="text"
                    rows="5"
                    value={this.state.text}
                    onChange={this.onChange}
                    error={errors.text}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Update Post
                </button>
                <Link className="btn btn-outline-info ml-4" to="/feed">
                  Discard Changes
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditPost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post,
});

export default connect(mapStateToProps, { updatePost, getPost })(
  withRouter(EditPost)
);
