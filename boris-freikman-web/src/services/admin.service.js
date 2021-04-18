import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class AdminService {
  // User
  getUserById(id) {
    return axios
      .get(API_URL + "getUserById", {
        headers: authHeader(),
        params: { _id: id },
      })
      .then((response) => {
        return response.data.user;
      });
  }

  getAllUsersForAdminBoard() {
    return axios.get(API_URL + "getAllUsersForAdminBoard", { headers: authHeader() });
  }

  updateUserById(user) {
    return axios.post(API_URL + "updateUserById", user, { headers: authHeader() });
  }

  registerNewUser(user) {
    return axios.post(API_URL + "registerNewUser", user, { headers: authHeader() });
  }

  // Exercises
  addExercise(name, description) {
    return axios.post(API_URL + "addExercise", { name, description }, { headers: authHeader() });
  }

  updateExercise(name, description) {
    return axios.post(API_URL + "updateExercise", {
        name,
        description,
      }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getAllExercises() {
    return axios.get(API_URL + "getAllExercises", { headers: authHeader() });
  }

  deleteExercise(name) {
    return axios.delete(API_URL + "deleteExercise", {
        headers: authHeader(),
        data: { name: name },
      })
      .then((response) => {
        return response.data;
      });
  }

  // Workouts

  addWorkout(workout) {
    return axios.post(API_URL + "addWorkout", { ...workout }, { headers: authHeader() });
  }

  getAllActiveWorkouts() {
    return axios.get(API_URL + "getAllActiveWorkouts", { headers: authHeader() })
      .then((response) => {
        return response.data.workouts;
      });
  }

  getAllPreviousWorkouts() {
    return axios.get(API_URL + "getAllPreviousWorkouts", { headers: authHeader() })
      .then((response) => {
        return response.data.workouts;
      });
  }

  getAdminWorkoutById(id) {
    return axios.get(API_URL + "getAdminWorkoutById", {
        headers: authHeader(),
        params: { _id: id },
      })
      .then((response) => {
        return response.data.workout;
      });
  }
}

export default new AdminService();
