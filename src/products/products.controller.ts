import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { Product } from "./products.model";
import { FileInterceptor } from "@nestjs/platform-express";


@ApiTags('Товары')
@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {
  }

  @ApiOperation({summary: 'Создание товара'}) // описываем запросы для API (для примера)
  @ApiResponse({status: 200, type: Product})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body() dto: CreateProductDto,
         @UploadedFile() image) {
    return this.productsService.createProduct(dto, image)
  }
}
