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
import { User } from "../auth/user.entity";
import { ReadUser } from "../auth/read-user.decorator";

@Controller("/tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(
    @Body() newTaskDto: CreateNewTaskDto,
    @ReadUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createNewTask(newTaskDto, user);
  }

  @Get()
  readTasks(
    @Query(ValidationPipe) filterDto: ReadTasksFilterDto,
    @ReadUser() user: User,
  ) {
    return this.tasksService.readTasks(filterDto, user);
  }

  @Get("/:id")
  readTaskById(@Param("id") id: string, @ReadUser() user: User): Promise<Task> {
    return this.tasksService.readTaskById(id, user);
  }

  /* @Patch("/:id/status")
  updateTaskStatusById(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, status);
  } */

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
