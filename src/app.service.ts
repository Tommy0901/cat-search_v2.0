import { Injectable } from '@nestjs/common';
import * as breedList from './config/initial/breed-list.json';
import * as catList from './config/initial/cat-list.json';

@Injectable()
export class AppService {
  private readonly breeds = breedList;
  private readonly cats = catList;

  getCats(limit, order, page, selectedOptions) {
    // load cats from json
    const filteredCats =
      selectedOptions.length > 0
        ? this.cats.filter((i) => selectedOptions.includes(i.id))
        : this.cats;

    return order === 'DESC'
      ? filteredCats
          .slice(-limit * page, filteredCats.length - limit * (page - 1))
          .reverse()
      : order === 'ASC'
        ? filteredCats.slice(limit * (page - 1), limit * page)
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
