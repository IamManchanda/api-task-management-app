import { Controller, Get, Post, Body } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * @desc    - Read all tasks.
   * @route   - GET /tasks
   * @access - Public
   */
  @Get()
  readAllTasks(): Task[] {
    return this.tasksService.readAllTasks();
  }

  /**
   * @desc    - Create single task.
   * @route   - POST /tasks
   * @access - Public
   */
  @Post()
  createSingleTask(
    @Body("title") title: string,
    @Body("description") description: string,
  ): Task {
    return this.tasksService.createSingleTask(title, description);
  }
}
