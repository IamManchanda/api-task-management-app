import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateNewTaskDto } from "./dto/create-new-task.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createNewTask({ title, description }: CreateNewTaskDto): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
