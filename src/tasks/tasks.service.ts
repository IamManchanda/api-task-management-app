import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v1 as uuidv1 } from "uuid";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  readAllTasks(): Task[] {
    return this.tasks;
  }

  createSingleTask(title: string, description: string): Task {
    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
