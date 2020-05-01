import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v1 as uuidv1 } from "uuid";
import { CreateNewTaskDto } from "./dto/create-new-task.dto";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createNewTask({ title, description }: CreateNewTaskDto): Task {
    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  readAllTasks(): Task[] {
    return this.tasks;
  }

  readTasksWithFilters({ status, search }: ReadTasksFilterDto): Task[] {
    let tasks = this.readAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  readTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.readTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
