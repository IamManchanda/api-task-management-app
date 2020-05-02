import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateNewTaskDto } from "./dto/create-new-task.dto";
import { TaskStatus } from "./task-status.enum";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async readTasks({ status, search }: ReadTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder("task");
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

  async createNewTask({ title, description }: CreateNewTaskDto): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
