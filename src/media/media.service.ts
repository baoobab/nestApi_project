import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Media } from "./media.model";
import { FilesService } from "../files/files.service";

@Injectable()
export class MediaService {

  constructor(@InjectModel(Media) private mediaRepository: typeof Media,
              private fileService: FilesService) {
  }

  async create(image: any) {
    const title = await this.fileService.createFile(image)
    if (title) {
      const media = await this.mediaRepository.create({title: title})
      return media
    }
    return null
  }
}
