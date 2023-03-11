export class Index {
  public name: string;
  public current: number;
  public change: number;
  public advances: number;
  public declines: number;
  public unchanged: number;
}

export class IndexCollection {
  public result: Array<Index>;
}
