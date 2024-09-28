import requests from './httpService';

const NotificationServices = {
  addNotification: async (body) => {
    return requests.post('/notification/add', body);
  },

  getAllNotification: async () => {
    return requests.get('/notification');
  },

  updateStatus: async (id, body) => {
    return requests.put(`/notification/${id}`, body);
  },

  deleteNotification: async (id) => {
    return requests.delete(`/notification/${id}`);
  },
};

export default NotificationServices;
