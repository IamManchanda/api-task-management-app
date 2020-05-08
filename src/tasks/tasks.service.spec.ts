import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { ReadTasksFilterDto } from "./dto/read-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from "@nestjs/common";

const mockTaskId = "ce9401f4-1b86-4b12-9955-c9936e93fe43";
const mockUser = {
  id: "f6a24882-2c30-46d0-b87a-f710eb49f317",
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
  delete: jest.fn(),
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
      const result = await tasksService.readTaskById(mockTaskId, mockUser);
      expect(result).toEqual(mockData);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockTaskId,
          userId: mockUser.id,
        },
      });
    });

    it("throws an error if task does not exists", () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.readTaskById(mockTaskId, mockUser)).rejects.toThrow(
        NotFoundException,
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

  describe("updateTaskStatusById", () => {
    it("successfully updates the task", async () => {
      const save = jest.fn().mockResolvedValue(true);
      tasksService.readTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });
      expect(tasksService.readTaskById).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
      const result = await tasksService.updateTaskStatusById(
        mockTaskId,
        TaskStatus.DONE,
        mockUser,
      );
      expect(tasksService.readTaskById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });

  describe("deleteTaskById", () => {
    it("successfully deletes the task if task exists", async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      await tasksService.deleteTaskById(mockTaskId, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: mockTaskId,
        userId: mockUser.id,
      });
    });

    it("throws an error if task does not exists", () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTaskById(mockTaskId, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
