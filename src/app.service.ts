import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class AppService {
  private readonly breeds = require(
    path.resolve(__dirname, 'config', 'initial', 'breed-list.json'),
  );
  private readonly cats = require(
    path.resolve(__dirname, 'config', 'initial', 'cat-list.json'),
  );

  getCats(limit, order, page, selectedOptions) {
    // load cats from json and filter cats based on selected options
    const filteredCats =
      selectedOptions.length > 0
        ? this.cats.filter((i) => selectedOptions.includes(i.id))
        : this.cats;

    // calculate start and end indexes based on page and limit
    const startIndex = limit * (page - 1);
    const endIndex = limit * page;

    // return array based on order
    return order === 'DESC'
      ? filteredCats
          .slice(-endIndex, filteredCats.length - startIndex)
          .reverse()
      : order === 'ASC'
        ? filteredCats.slice(startIndex, endIndex)
        : Array.from(
            { length: limit },
            () => filteredCats[Math.floor(Math.random() * filteredCats.length)],
          );
  }

  getBreeds() {
    // load breeds from json
    return this.breeds;
  }
}
