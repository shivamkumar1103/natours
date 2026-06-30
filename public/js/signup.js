/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert.js';

export async function signup(name, email, password, passwordConfirm) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        window.location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Something went wrong');
  }
}
