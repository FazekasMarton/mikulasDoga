import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) { }

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
    try {
      return await this.prisma.children.findUniqueOrThrow({
        include: {
          toys: true
        },
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

  async update(id: number, updateChildDto: UpdateChildDto) {
    try {
      return await this.prisma.children.update({
        where: {
          id: id
        },
        data: updateChildDto
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

  async remove(id: number) {
    return await this.prisma.children.delete({
      where: {
        id: id
      }
    });
  }

  async addToy(childId: number, toyId: number) {
    try {
      return await this.prisma.children.update({
        where: {
          id: childId
        },
        data: {
          toys: {
            connect: {
              id: toyId
            }
          }
        }
      })
    } catch (error) {
      switch (error.code) {
        case "P2025":
        case "P2016":
          throw new HttpErrorByCode[404]("Not found")
        default:
          throw new HttpErrorByCode[400]("Bad request")
      }
    }
  }

  async removeToy(childId: number, toyId: number) {
    try {
      return await this.prisma.children.update({
        where: {
          id: childId
        },
        data: {
          toys: {
            disconnect: {
              id: toyId
            }
          }
        }
      })
    } catch (error) {
      switch (error.code) {
        case "P2025":
        case "P2016":
          throw new HttpErrorByCode[404]("Not found")
        default:
          throw new HttpErrorByCode[400]("Bad request")
      }
    }
  }
}