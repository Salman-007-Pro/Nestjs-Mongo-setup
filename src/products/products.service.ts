import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

interface productCheck {
  title?: string;
  description?: string;
  price?: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts(): Promise<Array<Product>> {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }

  async getSingleProduct(id: string): Promise<Product> {
    const product = await this.findProduct(id);
    return product;
  }

  async updateProduct(id: string, param: productCheck) {
    try {
      const product = await this.findProduct(id);
      const reqUpdates = Object.keys(param);
      const allowedUpadates = {
        title: 'title',
        description: 'description',
        price: 'price',
      };
      const isValidOperation = reqUpdates.every(
        (property) => property in allowedUpadates,
      );
      if (!isValidOperation) {
        throw new NotFoundException('The given request parameter are wrong');
      }
      reqUpdates.forEach((update) => (product[update] = param[update]));
      await product.save();
      return {
        message: 'Successful updated the Product',
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delProduct(id: string) {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        throw new NotFoundException('Could not find the product.');
      }

      return {
        message: 'Successful deleted the Product',
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new NotFoundException('Could not find the product.');
      }
      return product;
    } catch (error) {
      throw new NotFoundException('Could not find the product.');
    }
  }
}
