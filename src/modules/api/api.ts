import { AbstractApi } from "./AbstractApi";
import { ApiTest } from "./test";

export class Api extends AbstractApi {
  test: ApiTest;

  constructor() {
    // super(import.meta.env.VITE_API_BASEURL);
    super("http://localhost:4000/api");

    this.test = new ApiTest(this.client);
  }
}

export const api = new Api();
