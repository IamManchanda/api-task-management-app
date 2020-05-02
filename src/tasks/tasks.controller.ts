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
import { TaskStatus } from "./task-status.enum";

@Controller("/tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() newTaskDto: CreateNewTaskDto): Promise<Task> {
    return this.tasksService.createNewTask(newTaskDto);
  }

  @Get()
  readTasks(@Query(ValidationPipe) filterDto: ReadTasksFilterDto) {
    return this.tasksService.readTasks(filterDto);
  }

  @Get("/:id")
  readTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.readTaskById(id);
  }

  @Patch("/:id/status")
  updateTaskStatusById(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, status);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
