import { auth } from "@canva/user";
import axios from "axios";
import { API } from "./apis";

export async function fetchClasses() {
  const token = await auth.getCanvaUserToken();
  const classes = await axios.post(API.LIST_CLASSES, {
    token: token,
  });
  console.log(classes);
}

export async function fetchLessons(classId: string) {
  const token = await auth.getCanvaUserToken();
  const lessons = await axios.post(`${API.LIST_LESSONS}/${classId}`, {
    token: token,
  });
  console.log(lessons);
}

export async function getLessonContent(lessonId: string) {
  const token = await auth.getCanvaUserToken();
  const lessonContent = await axios.post(
    `${API.GET_LESSON_CONTENT}/${lessonId}`,
    {
      token: token,
    }
  );
  console.log(lessonContent);
}
