import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";

const mockUser = {
  username: "test_user",
};

const mockTaskRepository = () => ({
  readTasks: jest.fn(),
});

describe("TasksService", () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe("readTasks", () => {
    it("read tasks from the repository", async () => {
      const value = "some_value";
      taskRepository.readTasks.mockResolvedValue(value);
      expect(taskRepository.readTasks).not.toHaveBeenCalled();
      const filters: ReadTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: "Some search query",
      };
      const result = await tasksService.readTasks(filters, mockUser);
      expect(taskRepository.readTasks).toHaveBeenCalled();
      expect(result).toEqual(value);
    });
  });
});
