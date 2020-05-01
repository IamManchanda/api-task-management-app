import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
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
   * @desc    - Read task by id.
   * @route   - GET /tasks/:id
   * @access - Public
   */
  @Get("/:id")
  readTaskById(@Param("id") id: string): Task {
    return this.tasksService.readTaskById(id);
  }

  /**
   * @desc    - Create new task.
   * @route   - POST /tasks
   * @access - Public
   */
  @Post()
  createNewTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createNewTask(createTaskDto);
  }

  /**
   * @desc    - Update task by id.
   * @route   - PATCH /tasks/:id/status
   * @access - Public
   */
  @Patch("/:id/status")
  updateTaskStatusById(
    @Param("id") id: string,
    @Body("status") status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatusById(id, status);
  }

  /**
   * @desc    - Delete task by id.
   * @route   - DELETE /tasks/:id
   * @access - Public
   */
  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): void {
    this.tasksService.deleteTaskById(id);
  }
}
