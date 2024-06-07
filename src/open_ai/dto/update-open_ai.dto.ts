import { PartialType } from "@nestjs/mapped-types";
import { createThreadDto } from "./create-open_ai.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateThreadDto extends PartialType(createThreadDto) {
    @IsOptional()
    @IsString()
    name: string;
}