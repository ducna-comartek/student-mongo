import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from 'src/students/students.module';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Class, ClassSchema } from './entities/class.schema';
import { ClassesResolver } from './classes.resolver';
import { Student, StudentSchema } from 'src/students/entities/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Student.name, schema: StudentSchema }
    ]),
    forwardRef(() => StudentsModule)
  ],
  controllers: [ClassesController],
  providers: [ClassesService, ClassesResolver],
  exports: [ClassesService]
})

export class ClassesModule {
}
