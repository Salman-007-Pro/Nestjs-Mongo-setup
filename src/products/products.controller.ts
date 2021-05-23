import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body()
    completedBody,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    console.log(completedBody);
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return {
      id: generatedId,
    };
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') prodId) {
    return await this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(@Param('id') prodId, @Body() param) {
    return await this.productsService.updateProduct(prodId, param);
  }

  @Delete(':id')
  async delProduct(@Param('id') prodId) {
    return await this.productsService.delProduct(prodId);
  }
}
