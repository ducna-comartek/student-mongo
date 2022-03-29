import { forwardRef, Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { ClassesModule } from 'src/classes/classes.module';
import { StudentsModule } from 'src/students/students.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './entities/score.schema';
import { ScoresResolver } from './scores.resolver';
import { Student, StudentSchema } from 'src/students/entities/student.schema';
import { Subject, SubjectSchema } from 'src/subjects/entities/subject.schema';
import { MailModule } from 'src/comfirm/mail/mail.module';
import { ExcelModule } from 'src/comfirm/excel/excel.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Score.name, schema: ScoreSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
    BullModule.registerQueue({
      name: 'score',
    }),
    forwardRef(() => StudentsModule),
    forwardRef(() => SubjectsModule),
    forwardRef(() => ClassesModule),
    forwardRef(() => MailModule),
    forwardRef(() => ExcelModule)
  ],
  controllers: [ScoresController],
  providers: [ScoresService, ScoresResolver],
  exports: [ScoresService]
})
export class ScoresModule { }
