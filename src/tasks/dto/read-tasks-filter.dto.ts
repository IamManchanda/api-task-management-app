import { TaskStatus } from "../task.model";

export class ReadTasksFilterDto {
  status: TaskStatus;
  search: string;
}
