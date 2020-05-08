import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from "@nestjs/common";

const mockTaskId = 1;
const mockUser = {
  id: 12,
  username: "test_user",
};
const mockData = {
  title: "Test task title",
  description: "Test task description",
};
const mockValue = "mock_value";
const mockTask = "mock_task";

const mockTaskRepository = () => ({
  readTasks: jest.fn(),
  findOne: jest.fn(),
  createNewTask: jest.fn(),
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
    it("read tasks and returns the result", async () => {
      taskRepository.readTasks.mockResolvedValue(mockValue);
      expect(taskRepository.readTasks).not.toHaveBeenCalled();
      const filters: ReadTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: "Some search query",
      };
      const result = await tasksService.readTasks(filters, mockUser);
      expect(taskRepository.readTasks).toHaveBeenCalled();
      expect(result).toEqual(mockValue);
    });
  });

  describe("readTaskById", () => {
    it("successfully read the task and returns the result if task exists", async () => {
      taskRepository.findOne.mockResolvedValue(mockData);
      const result = await tasksService.readTaskById(1, mockUser);
      expect(result).toEqual(mockData);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTaskId, userId: mockUser.id },
      });
    });

    it("throws an error if task does not exists", () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.readTaskById(mockTaskId, mockUser)).rejects.toThrow(
        new NotFoundException(
          `Task with id: ${mockTaskId} for user ${mockUser.username} not found.`,
        ),
      );
    });
  });

  describe("createNewTask", () => {
    it("create new task and returns the result", async () => {
      taskRepository.createNewTask.mockResolvedValue(mockTask);
      expect(taskRepository.createNewTask).not.toHaveBeenCalled();
      const result = await tasksService.createNewTask(mockData, mockUser);
      expect(taskRepository.createNewTask).toHaveBeenCalledWith(
        mockData,
        mockUser,
      );
      expect(result).toEqual(mockTask);
    });
  });
});
