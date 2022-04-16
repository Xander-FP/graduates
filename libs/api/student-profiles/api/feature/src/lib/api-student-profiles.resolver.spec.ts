import {
  ApiStudentProfilesEntity,
  ApiStudentProfilesInputEntity,
} from '@graduates/api/student-profiles/api/shared/data-access';
import { ApiStudentProfileService } from '@graduates/api/student-profiles/service/feature';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiStudentProfileResolver } from './api-student-profiles.resolver';

describe('ApiStudentProfileResolver', () => {
  let resolver: ApiStudentProfileResolver;
  const studentInput = new ApiStudentProfilesInputEntity();

  studentInput.studentNum = '20465026';
  studentInput.phoneNum = '0007894568';
  studentInput.tags = ['AI', 'Big Data'];

  const MockStudentService = {
    findById: jest.fn((id) => {
      return {
        studentNum: id,
        firstName: 'Xander',
        lastName: 'Coetzer',
      };
    }),
    update: jest.fn((input) => {
      if (input.studentNum != 'u20465026') return null;
      return input;
    }),
    delete: jest.fn((id) => {
      if (id == 'u20465026') return 'Delete was successfull';
      return 'Student does not exist';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiStudentProfileResolver, ApiStudentProfileService],
    })
      .overrideProvider(ApiStudentProfileService)
      .useValue(MockStudentService)
      .compile();

    resolver = module.get<ApiStudentProfileResolver>(ApiStudentProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('@getStudent', () => {
    describe('the student exists', () => {
      it('should return the student object', () => {});
    });
    describe('the student does not exist', () => {
      it('should ', () => {});
    });
  });

  describe('@editStudent', () => {
    describe('the student exists', () => {
      it('should return the student object', () => {});
    });
    describe('the student does not exist', () => {
      it('should ', () => {});
    });
  });

  describe('@deleteStudent', () => {
    describe('the student exists', () => {
      it('should return the student object', () => {});
    });
    describe('the student does not exist', () => {
      it('should ', () => {});
    });
  });
});
