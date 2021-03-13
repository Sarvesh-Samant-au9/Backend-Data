import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../Actions/profile";

const GithubProfile = ({ getGithubRepos, username, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <h1>Loading..</h1>
      ) : (
        repos.map((eachRepo) => (
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={eachRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {eachRepo.name}
                </a>
              </h4>
              <p>{eachRepo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {eachRepo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {eachRepo.watchers_count}
                </li>
                <li className="badge badge-light">
                  Forks: {eachRepo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

GithubProfile.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(GithubProfile);
