import { runQuery } from "../index";

export type Course = {
  id: number;
  title: string;
};

export class CourseStore {
  static async index(): Promise<Course[]> {
    const result = await runQuery(`SELECT * FROM courses`);

    return result.rows;
  }
}
