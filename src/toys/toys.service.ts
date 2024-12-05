import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {
  constructor(private prisma: PrismaService){}

  async create(createToyDto: CreateToyDto) {
    return await this.prisma.toys.create({
      data: createToyDto
    });
  }
  
  async findAll() {
    return await this.prisma.toys.findMany();
  }
  
  async findOne(id: number) {
    return await this.prisma.toys.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    return await this.prisma.toys.update({
      where: {
        id: id
      },
      data: updateToyDto
    })
  }

  async remove(id: number) {
    return this.prisma.toys.delete({
      where: {
        id: id
      }
    })
  }
}
