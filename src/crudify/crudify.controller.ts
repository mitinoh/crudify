import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CrudifyService } from "./crudify.service";

@Controller(":entity")
export class CrudifyController<T> {
  constructor(private readonly crudService: CrudifyService<T>) {}

  @Post()
  create(@Body() createDto: Partial<T>) {
    return this.crudService.create(createDto);
  }

  @Post("/bulk")
  createBulk(@Body() data: T[]) {
    return this.crudService.createMany(data);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.crudService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.crudService.findOne({ _id: id });
  }

  @Put(":id")
  overwrite(@Param("id") id: string, @Body() updateDto: Partial<T>) {
    return this.crudService.overwrite(id, updateDto);
  }

  @Patch("/bulk")
  async updateMany(@Body() body: { filter: any; updateDto: any }) {
    const { filter, updateDto } = body;
    return this.crudService.updateMany(filter, updateDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDto: Partial<T>) {
    return this.crudService.update(id, updateDto);
  }

  @Delete("bulk")
  async deleteMany(@Body() ids: string[]) {
    return this.crudService.deleteMany(ids);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.crudService.delete(id);
  }
}
