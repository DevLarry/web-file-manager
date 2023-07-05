import { Type } from "./file-dir";

export class CreateFileDto {
    type: Type;
    name?: string;
    path: string;
    data?: string;
}
