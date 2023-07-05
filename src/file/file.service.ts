import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Type } from './dto/file-dir';

const container = 'C:/Users/coder/Documents/reactjs/fileManager/container'

@Injectable()
export class FileService {
  create(type: Type, createFileDto: CreateFileDto) {
    let pathf = path.join(container, createFileDto.path, createFileDto.name);
    if (type == Type.DIR)
      fs.mkdirSync(pathf);
    else
      fs.writeFileSync(pathf, createFileDto.data || ' ')
    return {path: pathf};
  }

  findAll() {
    return `This action returns all file`;
  }

  read(type: Type, pathd: string) {
    let pathf = path.join(container, pathd);

    if (type == Type.DIR)
      return fs.readdirSync(pathf).map(e=>{
        return {
          name: e,
          path: path.join(pathd, e),
          isDir: fs.statSync(path.join(pathf, e)).isDirectory()
        }
      });
    else
      return {data: fs.readFileSync(pathf)};
  }

  update(updateFileDto: UpdateFileDto) {
    let pathf = path.join(container, updateFileDto.path);
    fs.renameSync(pathf, path.join(container, updateFileDto.name));
    return {path: updateFileDto.newName}
  }

  remove(pathf: string) {
    pathf = path.join(container, pathf);
    fs.rmSync(pathf, {recursive: true, force: true})
    return {path: pathf};
  }
}
