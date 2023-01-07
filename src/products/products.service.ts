import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./products.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { MediaService } from "../media/media.service";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product) private productRepository: typeof Product,
              private mediaService: MediaService) {
  }

  async createProduct(dto: CreateProductDto, image: any) {
    if (dto.media_id) {
      const product = await this.productRepository.create(dto)
      return product
    }
    const media: number = (await this.mediaService.create(image)).id || null
    console.log(media)
    // @ts-ignore
    const product = await this.productRepository.create({...dto, media_id: media})
    return product
  }

}
