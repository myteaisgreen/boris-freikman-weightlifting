import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'test/all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'test/user', { headers: authHeader() });
  }
  
  getAdminBoard() {
    return axios.get(API_URL + 'test/admin', { headers: authHeader() });
  }

  getUserCurrentWorkout(id) {
    return axios
      .get(API_URL + "getUserCurrentWorkout", { params: { _id: id } })
      .then((response) => {
        return response.data.workout;
      });
  }

  getUserPreviousWorkouts(id) {
    return axios.get(API_URL + "getUserPreviousWorkouts", { params: { _id: id } })
    .then((response) => {
      return response.data.workouts;
    });
  }
}

export default new UserService();
