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
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TasksService } from "./tasks.service";
import { CreateNewTaskDto } from "./dto/create-new-task.dto";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";

@Controller("/tasks")
@UseGuards(AuthGuard())
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
  readTaskById(@Param("id") id: string): Promise<Task> {
    return this.tasksService.readTaskById(id);
  }

  @Patch("/:id/status")
  updateTaskStatusById(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, status);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
