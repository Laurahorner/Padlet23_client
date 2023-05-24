import {Rating} from "./rating";

export class Entry {
  constructor(public id: number,
              public entry_text: string,
              public padlet_id: number,
              public ratings?: Rating[]
  ) { }
}
