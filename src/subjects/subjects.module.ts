import { forwardRef, Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { ScoresModule } from 'src/scores/scores.module';
import { Subject, SubjectSchema } from './entities/subject.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsResolver } from './subjects.resolver';
import { Score, ScoreSchema } from 'src/scores/entities/score.schema';

@Module({
  imports: [
    forwardRef(() => ScoresModule),
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: Score.name, schema: ScoreSchema }
    ]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectsResolver],
  exports: [SubjectsService]
})

export class SubjectsModule { }
