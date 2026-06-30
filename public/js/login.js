/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert.js';

export async function login(email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');

      window.setTimeout(() => {
        window.location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Something went wrong');
  }
}

export async function logout() {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged out successfully!');
      location.reload(true);
      window.location.assign('/');
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
}
