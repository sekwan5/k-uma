import { AxiosInstance } from "axios";
import { ApiBase } from "./base";

export interface ITest {
  no: number;
  title: string;
  file: boolean;
  author: string;
  date: string;
  views: number;
}

export class ApiTest extends ApiBase<ITest> {
  constructor(client: AxiosInstance) {
    super(client, "/test");
    this.client = client;
  }
}
