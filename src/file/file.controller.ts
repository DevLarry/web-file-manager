import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Type } from './dto/file-dir';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('dir')
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(Type.DIR, createFileDto);
  }

  @Post()
  createFile(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(Type.FILE, createFileDto);
  }

  @Get()
  findAll(@Query('path') path: string) {
    return this.fileService.read(Type.FILE, path);
  }

  @Get('dir')
  findOne(@Query('path') path: string) {
    return this.fileService.read(Type.DIR, path);
  }

  @Patch()
  update(@Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(updateFileDto);
  }

  @Delete()
  remove(@Query('path') path: string) {
    return this.fileService.remove(path);
  }
}
