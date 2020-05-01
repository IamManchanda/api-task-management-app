import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v1 as uuidv1 } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  readAllTasks(): Task[] {
    return this.tasks;
  }

  readSingleTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createSingleTask({ title, description }: CreateTaskDto): Task {
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
