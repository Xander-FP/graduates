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
  const output = new ApiStudentProfilesEntity();
  output.dateOfBirth = '19/09/1999';
    output.phoneNum = '0834521355';
    output.email = 'John.Wick@gmail.com';
    output.firstName = 'John';
    output.studentNum = 'u20465026';
    output.lastName = 'Wick';
    output.title = 'MSc';
    output.nameOfDegree = 'Computer Science';
    output.bio =
      'From a young age John has showed promise, but it was not until age 20 that he got his second MSc...';
    output.tags = ['Security','Hacking','Error elimination'];
    output.employmentStatus = 'Unemployed, open to offers';
    output.preferredLocation = 'Pretoria';
    output.notableAchievements = ['Part of Facebook','Part of Goldenkey'];
    output.links = [
      ['discord', 'http'],
      ['twitch', 'https'],
    ];
    output.academicRecord = false;
    output.cv = true;
    output.capstoneProject = true;

  studentInput.studentNum = '20465026';
  studentInput.phoneNum = '0007894568';
  studentInput.tags = ['AI', 'Big Data'];

  const MockStudentService = {
    findById: jest.fn((id) => {
      return ['Xander',id,'Coetzer'];
      // return {
      //   studentNum: id,
      //   firstName: 'Xander',
      //   lastName: 'Coetzer',
      // };
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
    describe('if the student exists', () => {
      it('should return the student object', async () => {
        const student = await (resolver.getStudent('u20465026'));
        expect(student).toEqual(output);
        expect(MockStudentService.findById).toBeCalled();
      });
    });
    describe('if the student does not exist', () => {
      it('should ', () => {});
    });
  });

  describe('@editStudent', () => {
    describe('if the student exists', () => {
      it('should return the student object', async () => {
        const student = await (resolver.editStudent(studentInput));
        expect(student).toEqual(studentInput);
        expect(MockStudentService.update).toBeCalled();
      });
    });
    describe('if the student does not exist', () => {
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
