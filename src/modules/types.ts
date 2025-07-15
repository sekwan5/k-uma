/* eslint-disable @typescript-eslint/no-explicit-any */
export type IndexSignatureType = {
  [key: string]: any;
};

export interface Menu {
  id: string;
  title: string;
  to: string;
  children?: Menu[];
}

export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginationList {
  list: IndexSignatureType[];
  pagination: Pagination;
}

// Window 인터페이스를 전역으로 확장
declare global {
  interface Window {
    kakao: {
      ads: any;
    };
  }
}
