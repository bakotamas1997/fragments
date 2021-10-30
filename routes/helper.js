const isProjectValid = (user, req) => {
  const selectedProject = user.projects.filter(
    (project) => project._id.toString() === req.params.project_id
  );

  return selectedProject[0];
};

const isStoryValid = (project, req) => {
  const selectedStory = project.stories.filter(
    (story) => story._id.toString() === req.params.story_id
  );

  return selectedStory[0];
};

module.exports = {
  isProjectValid: isProjectValid,
  isStoryValid: isStoryValid,
};
