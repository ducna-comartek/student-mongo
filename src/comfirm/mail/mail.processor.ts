import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import {
    OnQueueActive,
    OnQueueCompleted,
    Process,
    Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import Mail from 'nodemailer/lib/mailer';

@Processor('mail-queue')
export class MailProcessor {
    private readonly logger = new Logger(this.constructor.name);
    constructor(
        private readonly mailerService: MailerService,
    ) { }

    @OnQueueActive()
    async onActive(job: Job<ISendMailOptions>) {
        console.log(
            `Sending email to ${job.data.to}...`,
        );
    }

    @OnQueueCompleted()
    async onCompleted(job: Job<ISendMailOptions>) {
        console.log(
            `Complete send email ${job.data.to}`,
        );
    }

    @Process('score-mail')
    async sendMyEmail(job: Job<ISendMailOptions>) {
        try {
            function contentStringToBuffer(attachment: Mail.Attachment) {
                return {
                    ...attachment,
                    content: Buffer.from(attachment.content as string, 'base64'),
                };
            }
            const attachments = job.data.attachments.map(contentStringToBuffer);
            return await this.mailerService.sendMail({
                ...job.data,
                attachments
            });
        } catch (error) {
            this.logger.error('Failed to send email.', error.stack);
            throw error;
        }
    }
}