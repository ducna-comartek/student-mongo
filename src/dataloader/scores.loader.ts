import * as DataLoader from 'dataloader';
import { ObjectId } from 'mongoose';
import { Score, ScoreResult } from '../scores/entities/score.schema';
import { ScoresService } from '../scores/scores.service';

export function createScoresLoaderByStudent(scoresService: ScoresService) {
    return new DataLoader<ObjectId, ScoreResult>(async (_ids: ObjectId[]) => {
        const scores = _ids.map((_id) => scoresService.findByStudent(_id));
        return await Promise.all(scores);
    });
}

export function createScoresLoaderBySubject(scoresService: ScoresService) {
    return new DataLoader<ObjectId, ScoreResult>(async (_ids: ObjectId[]) => {
        const scores = _ids.map((_id) => scoresService.findBySubject(_id));
        return await Promise.all(scores);
    });
}