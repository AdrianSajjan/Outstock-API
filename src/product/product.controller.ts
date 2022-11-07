import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public, Roles } from '../shared/decorator';
import { Role } from '../shared/enum';
import { CreateProductData, FetchProductData } from './data-access';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Public()
  getAllProducts(@Query() fetchProductData: FetchProductData) {
    return this.productService.findAllProducts(fetchProductData);
  }

  @Get(':id')
  @Public()
  getProductByID(@Param('id') id: string) {
    return null;
  }

  @Post('upload')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('images'))
  uploadProduct(@UploadedFiles() files: Array<Express.Multer.File>, @Body() createProductData: CreateProductData) {
    return { files, createProductData };
  }
}
