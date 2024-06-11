import { auth } from '@canva/user';
import axios from 'axios';
import { API } from './apis';

export async function fetchClasses() {
  const token = await auth.getCanvaUserToken();
  return await axios.post(API.LIST_CLASSES, {
    token: token,
  });
}

export async function fetchUser() {
  const token = await auth.getCanvaUserToken();
  return await axios.post(API.GET_USER, {
    token: token,
  });
}

export async function fetchLessons(classId: string) {
  const token = await auth.getCanvaUserToken();
  return await axios.post(`${API.LIST_LESSONS}/${classId}`, {
    token: token,
  });
}

export async function getLessonContent(lessonId: string) {
  const token = await auth.getCanvaUserToken();
  const lessonContent = await axios.post(
    `${API.GET_LESSON_CONTENT}/${lessonId}`,
    {
      token: token,
    },
  );
  console.log(lessonContent);
}
