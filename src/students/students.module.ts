import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema, Student } from './entities/student.schema';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { ClassesModule } from 'src/classes/classes.module';
import { ScoresModule } from 'src/scores/scores.module';
import { ClassSchema, Class } from 'src/classes/entities/class.schema';
import { ScoreSchema, Score } from 'src/scores/entities/score.schema';
import { StudentsResolver } from './students.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Class.name, schema: ClassSchema },
      { name: Score.name, schema: ScoreSchema }
    ]),
    forwardRef(() => ClassesModule),
    forwardRef(() => ScoresModule),
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsResolver],
  exports: [StudentsService]
})
export class StudentsModule { }
