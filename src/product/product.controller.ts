import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { from, map } from 'rxjs';
import { Public, Roles } from '../shared/decorator';
import { Role } from '../shared/enum';
import { CreateProductData } from './data-access';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Public()
  getAllProducts(@Query() query: string) {
    return this.productService.findAllProducts();
  }

  @Get(':slug')
  @Public()
  getProductBySlug(@Param('slug') slug: string) {
    return this.productService.findProductBySlug(slug);
  }

  @Post('upload')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('images'))
  uploadProduct(@UploadedFiles() files: Array<Express.Multer.File>, @Body() createProductData: CreateProductData) {
    return { files, createProductData };
  }
}
