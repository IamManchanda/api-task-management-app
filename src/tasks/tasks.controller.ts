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

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() newTaskDto: CreateNewTaskDto): Promise<Task> {
    return this.tasksService.createNewTask(newTaskDto);
  }

  /* @Get()
  readTasks(@Query(ValidationPipe) filterDto: ReadTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.readTasksWithFilters(filterDto);
    }
    return this.tasksService.readAllTasks();
  } */

  @Get("/:id")
  readTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.readTaskById(id);
  }

  /* @Patch("/:id/status")
  updateTaskStatusById(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatusById(id, status);
  } */

  @Delete("/:id")
  deleteTaskById(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
