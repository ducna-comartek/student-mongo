import { IsString, IsEmail, Length, IsNumber } from 'class-validator';

export class SendOutcomeMailDto {
    @IsString()
    @Length(10, 100)
    readonly name: string;

    @IsEmail()
    readonly email: string;

    readonly data: Buffer;

}
