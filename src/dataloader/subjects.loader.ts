import * as DataLoader from 'dataloader';
import { ObjectId } from 'mongoose';
import { Subject } from '../subjects/entities/subject.schema';
import { SubjectsService } from '../subjects/subjects.service';

export function createSubjectsLoaderById(subjectsService: SubjectsService) {
    return new DataLoader<ObjectId, Subject>(async (_ids: ObjectId[]) => {
        const scores = _ids.map((_id) => subjectsService.findOne(_id));
        return await Promise.all(scores);
    });
}