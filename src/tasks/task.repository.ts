import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateNewTaskDto } from "./dto/create-new-task.dto";
import { TaskStatus } from "./task-status.enum";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";
import { User } from "../auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async readTasks(
    { status, search }: ReadTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const query = this.createQueryBuilder("task");
    query.where("task.userId = :userId", { userId: user.id });
    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere(
        "(task.title LIKE :search OR task.description LIKE :search)",
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createNewTask(
    { title, description }: CreateNewTaskDto,
    user: User,
  ): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}
