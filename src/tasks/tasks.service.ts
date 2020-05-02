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

  readTasks(filterDto: ReadTasksFilterDto) {
    console.log(filterDto);
  }

  async readTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }
    return found;
  }

  createNewTask(newTaskDto: CreateNewTaskDto): Promise<Task> {
    return this.taskRepository.createNewTask(newTaskDto);
  }

  async updateTaskStatusById(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.readTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Task with id: ${id} not found for deleting the task.`,
      );
    }
  }
}
