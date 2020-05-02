import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateNewTaskDto } from "./dto/create-new-task.dto";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Task } from "./task.entity";

@Controller("/tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * @desc    - Create new task.
   * @route   - POST /tasks
   * @access - Public
   */
  /* @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() newTaskDto: CreateNewTaskDto): Task {
    return this.tasksService.createNewTask(newTaskDto);
  } */

  /**
   * @desc    - Read tasks (all or with filters).
   * @route   - GET /tasks
   * @access - Public
   */
  /* @Get()
  readTasks(@Query(ValidationPipe) filterDto: ReadTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.readTasksWithFilters(filterDto);
    }
    return this.tasksService.readAllTasks();
  } */

  /**
   * @desc    - Read task by id.
   * @route   - GET /tasks/:id
   * @access - Public
   */
  @Get("/:id")
  readTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.readTaskById(id);
  }

  /**
   * @desc    - Update task by id.
   * @route   - PATCH /tasks/:id/status
   * @access - Public
   */
  /* @Patch("/:id/status")
  updateTaskStatusById(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatusById(id, status);
  } */

  /**
   * @desc    - Delete task by id.
   * @route   - DELETE /tasks/:id
   * @access - Public
   */
  /* @Delete("/:id")
  deleteTaskById(@Param("id") id: string): void {
    this.tasksService.deleteTaskById(id);
  } */
}
