import { from, map } from 'rxjs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Role } from '../shared/enum';
import { ProductService } from './product.service';
import { Public, Roles } from '../shared/decorator';
import { FetchProductQueryData, CreateProductData } from './data-access';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Public()
  getAllProducts(@Query() query: FetchProductQueryData) {
    console.log(typeof query.price?.$gt);
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
