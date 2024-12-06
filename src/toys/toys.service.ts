import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ToysService {
  constructor(private prisma: PrismaService) { }

  async create(createToyDto: CreateToyDto) {
    return await this.prisma.toys.create({
      data: createToyDto
    });
  }

  async findAll() {
    return await this.prisma.toys.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prisma.toys.findUniqueOrThrow({
        where: {
          id: id
        }
      });
    } catch (error) {
      switch (error.code) {
        case "P2025":
          throw new HttpErrorByCode[404]("Not found")
        default:
          throw new HttpErrorByCode[400]("Bad request")
      }
    }
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    try {
      return await this.prisma.toys.update({
        where: {
          id: id
        },
        data: updateToyDto
      })
    } catch (error) {
      switch (error.code) {
        case "P2025":
          throw new HttpErrorByCode[404]("Not found")
        default:
          throw new HttpErrorByCode[400]("Bad request")
      }
    }
  }

  async remove(id: number) {
    return this.prisma.toys.delete({
      where: {
        id: id
      }
    })
  }
}
