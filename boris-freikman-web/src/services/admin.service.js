import axios from "axios";

const API_URL = 'http://localhost:8080/api/';

class AdminService {
  // User
  getUserById(id) {
    return axios
      .get(API_URL + "getUserById", { params: { _id: id } })
      .then((response) => {
        return response.data.user;
      });
  }

  getAllUsersForAdminBoard() {
    return axios.get(API_URL + "getAllUsersForAdminBoard").then((response) => {
      return response.data.users;
    });
  }

  updateUserById(user) {
    return axios.post(API_URL + "updateUserById", user).then((response) => {
      return response.data;
    });
  }
  // Exercises
  addExercise(name, description) {
    return axios
      .post(API_URL + "addExercise", {
        name,
        description,
      })
      .then((response) => {
        return response.data;
      });
  }

  updateExercise(name, description) {
    return axios
      .post(API_URL + "updateExercise", {
        name,
        description,
      })
      .then((response) => {
        return response.data;
      });
  }

  getAllExercises() {
    return axios.get(API_URL + "getAllExercises", {}).then((response) => {
      return response.data.exercises;
    });
  }

  deleteExercise(name) {
    return axios
      .delete(API_URL + "deleteExercise", { data: { name: name } })
      .then((response) => {
        return response.data;
      });
  }

  // Workouts

  addWorkout(workout) {
    return axios
      .post(API_URL + "addWorkout", { ...workout })
      .then((response) => {
        return response.data.workouts;
      });
  }

  getAllActiveWorkouts() {
    return axios.get(API_URL + "getAllActiveWorkouts").then((response) => {
      return response.data.workouts;
    });
  }

  getAllPreviousWorkouts() {
    return axios.get(API_URL + "getAllPreviousWorkouts").then((response) => {
      return response.data.workouts;
    });
  }

  getAdminWorkoutById(id) {
    return axios.get(API_URL + "getAdminWorkoutById", { params: { _id: id } }).then((response) => {
      return response.data.workout;
    })
  }
}

export default new AdminService();
