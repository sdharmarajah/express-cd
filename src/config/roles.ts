const allRoles = {
  USER: [],
  ADMIN: ['getUsers', 'manageUsers'],
  QUIZ_CREATOR: ['getQuestions','getQuestion','getQuizes','getQuiz','createQuiz','updateQuestion'],
};

export const roles = Object.keys(allRoles); 
export const roleRights = new Map(Object.entries(allRoles));
