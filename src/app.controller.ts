import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { fetchBreeds, fetchCats } from './helpers/api';

@Controller()
export class AppController {
  @Get('catList')
  async catList(@Req() req: Request) {
    const limit = req.query.limit || 12;
    const order = req.query.order || 'DESC';
    const page = req.query.page || 1;
    const selectedOptions = (req.query.breed_ids as string)?.split(',') || [];

    return await fetchCats(limit, order, page, selectedOptions);
  }

  @Get('breedList')
  async breedList() {
    return await fetchBreeds();
  }

  @Get()
  @Render('index')
  getIndex() {
    return (async () => {
      // const limit = 12;
      // const order = 'DESC';
      // const page = 1;
      // const selectedOptions = [];
      // const list = await fetchCats(limit, order, page, selectedOptions);
      const col1 = [];
      const col2 = [];
      const col3 = [];

      // // 迴圈將元素分組
      // for (let i = 0; i < list.length; i++) {
      //   if (i % 3 === 0) {
      //     col1.push(list[i]);
      //   } else if (i % 3 === 1) {
      //     col2.push(list[i]);
      //   } else {
      //     col3.push(list[i]);
      //   }
      // }
      return { col1, col2, col3 };
    })();
  }
}
