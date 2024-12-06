import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async create(createChildDto: CreateChildDto) {
    return await this.prisma.children.create({
      data: createChildDto
    });
  }

  async findAll() {
    return await this.prisma.children.findMany({
      include: {
        toys: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.children.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    return await this.prisma.children.update({
      where: {
        id: id
      },
      data: updateChildDto
    });
  }

  async remove(id: number) {
    return await this.prisma.children.delete({
      where: {
        id: id
      }
    });
  }
}