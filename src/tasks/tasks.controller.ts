import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("/tasks")
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
   * @desc    - Read single task by id.
   * @route   - GET /tasks/:id
   * @access - Public
   */
  @Get("/:id")
  readSingleTaskById(@Param("id") id: string): Task {
    return this.tasksService.readSingleTaskById(id);
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
