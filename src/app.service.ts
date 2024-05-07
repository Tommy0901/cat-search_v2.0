import { Injectable } from '@nestjs/common';
import * as breedList from './config/initial/breed-list.json';
import * as catList from './config/initial/cat-list.json';

@Injectable()
export class AppService {
  private readonly breeds = breedList;
  private readonly cats = catList;

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
            () => filteredCats[Math.ceil(Math.random() * filteredCats.length)],
          );
  }

  getBreeds() {
    // load breeds from json
    return this.breeds;
  }
}
