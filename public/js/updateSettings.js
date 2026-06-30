/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert.js';

export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${type === 'password' ? 'updatePassword' : 'updateMe'}`,
      data: data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Something went wrong');
  }
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updatePassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Something went wrong');
  }
};
