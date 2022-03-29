import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SendMailDto } from './dto/index';

@Injectable()
export class MailService {
    constructor(
        @InjectQueue('mail-queue')
        private readonly mailQueue: Queue,
    ) { }

    async sendEmailWithQueue({ jobOptions, ...sendMailDto }: SendMailDto) {
        const date = new Date();
        const options = {
            to: sendMailDto.email,
            subject: 'Bạn có kết quả học tập mới!',
            template: 'score',
            attachments: [
                {
                    filename: 'result.xlsx',
                    contentType:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    content: sendMailDto.data
                }
            ],
            context: {
                name: sendMailDto.name,
                score: sendMailDto.score,
                subject: sendMailDto.subject,
                date: date
            }
        };
        return this.mailQueue.add('score-mail', {
            ...options
        }, jobOptions);
    }
}
