import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNewTaskDto } from "./dto/create-new-task.dto";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async readTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return found;
  }

  createNewTask(newTaskDto: CreateNewTaskDto): Promise<Task> {
    return this.taskRepository.createNewTask(newTaskDto);
  }

  /*
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

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.readTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string): void {
    const found = this.readTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  } */
}
