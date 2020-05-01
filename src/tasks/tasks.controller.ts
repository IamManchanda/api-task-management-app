import { Controller, Get, Post, Body } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

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
  createSingleTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createSingleTask(createTaskDto);
  }
}
