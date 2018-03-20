export class Photo {
  constructor(
    public id: number,
    public url: string,
    public created_at: string,
    public likes: number,
    public collection_name: string,
    public name: string,
  ) {}
}
