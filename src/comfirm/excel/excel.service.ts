import { Injectable } from '@nestjs/common';
import * as XlsxTemplate from 'xlsx-template';
import * as fs from 'fs';
import { CreateExcelAddScoreDto } from './dto/index';

@Injectable()
export class ExcelService {

    async createExcelAddScore({ class: _class, student, subject, score }: CreateExcelAddScoreDto) {
        const data = await fs.promises.readFile('./src/templates/xlsx/score.xlsx');
        const template = new XlsxTemplate(data);
        const values = {
            subject: subject,
            std: student,
            score: score,
            class: _class
        };
        template.substitute(1, values);
        const dataBase64 = template.generate('base64');
        return Buffer.from(dataBase64, 'base64');
    }
}
