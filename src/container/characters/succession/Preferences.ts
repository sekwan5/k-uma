/**
 * 사용자 설정을 관리하는 클래스
 * localStorage를 사용하여 브라우저에 설정을 저장하고 불러옴
 */
export class Preferences {
  // 부모 정렬 순서 설정 키
  private static readonly KEY_PARENT_SORT_ORDER = "ParentSortOrder";
  // 부모 자동 설정 대상 키
  private static readonly KEY_AUTO_SET_PARENTS_TARGET = "AutoSetParentsTarget";
  // 보유 캐릭터 목록 키
  private static readonly KEY_OWNED_CHARA = "OwnedChara";
  // 행 커스텀 필터 키
  private static readonly KEY_ROW_CUSTOM_FILTER = "RowCustomFilter";
  // 열 커스텀 필터 키
  private static readonly KEY_COLUMN_CUSTOM_FILTER = "ColumnCustomFilter";
  // 행 관계 필터 키
  private static readonly KEY_ROW_RELATION_FILTER = "RowRelationFilter";
  // 행 이름 필터 키
  private static readonly KEY_ROW_NAME_FILTER = "RowNameFilter";
  // 열 관계 필터 키
  private static readonly KEY_COLUMN_RELATION_FILTER = "ColumnRelationFilter";
  // 열 이름 필터 키
  private static readonly KEY_COLUMN_NAME_FILTER = "ColumnNameFilter";

  /**
   * localStorage에 설정값을 저장하는 유틸리티 함수
   * @param key 저장할 설정의 키
   * @param value 저장할 설정값
   */
  private static save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * localStorage에서 설정값을 불러오는 유틸리티 함수
   * @param key 불러올 설정의 키
   * @returns 설정값 또는 null
   */
  private static load(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * 부모 정렬 순서 설정을 저장
   * @param value true: 오름차순, false: 내림차순
   */
  static saveParentSortOrder(value: boolean): void {
    this.save(this.KEY_PARENT_SORT_ORDER, value ? "1" : "0");
  }

  /**
   * 저장된 부모 정렬 순서 설정을 불러옴
   * @returns 정렬 순서 설정값
   */
  static loadParentSortOrder(): boolean {
    return this.load(this.KEY_PARENT_SORT_ORDER) === "1";
  }

  /**
   * 부모 자동 설정 대상을 저장
   * @param value 자동 설정 대상 인덱스
   */
  static saveAutoSetParentsTarget(value: number): void {
    this.save(this.KEY_AUTO_SET_PARENTS_TARGET, value.toString());
  }

  /**
   * 저장된 부모 자동 설정 대상을 불러옴
   * @returns 자동 설정 대상 인덱스
   */
  static loadAutoSetParentsTarget(): number {
    const value = this.load(this.KEY_AUTO_SET_PARENTS_TARGET);
    return value ? parseInt(value) : 0;
  }

  /**
   * 보유 캐릭터 목록을 저장
   * @param value 보유 캐릭터 ID 배열
   */
  static saveOwnedChara(value: string[]): void {
    this.save(this.KEY_OWNED_CHARA, JSON.stringify(value));
  }

  /**
   * 저장된 보유 캐릭터 목록을 불러옴
   * @returns 보유 캐릭터 ID 배열
   */
  static loadOwnedChara(): string[] {
    const value = this.load(this.KEY_OWNED_CHARA);
    return value ? JSON.parse(value) : [];
  }

  /**
   * 행 커스텀 필터 설정을 저장
   * @param value 필터 설정 배열
   */
  static saveRowCustomFilter(value: string[]): void {
    this.save(this.KEY_ROW_CUSTOM_FILTER, JSON.stringify(value));
  }

  /**
   * 저장된 행 커스텀 필터 설정을 불러옴
   * @returns 필터 설정 배열
   */
  static loadRowCustomFilter(): string[] {
    const value = this.load(this.KEY_ROW_CUSTOM_FILTER);
    return value ? JSON.parse(value) : [];
  }

  /**
   * 열 커스텀 필터 설정을 저장
   * @param value 필터 설정 배열
   */
  static saveColumnCustomFilter(value: string[]): void {
    this.save(this.KEY_COLUMN_CUSTOM_FILTER, JSON.stringify(value));
  }

  /**
   * 저장된 열 커스텀 필터 설정을 불러옴
   * @returns 필터 설정 배열
   */
  static loadColumnCustomFilter(): string[] {
    const value = this.load(this.KEY_COLUMN_CUSTOM_FILTER);
    return value ? JSON.parse(value) : [];
  }

  /**
   * 저장된 행 관계 필터를 불러옴
   * @returns 관계 ID 배열
   */
  static loadRowRelationFilter(): number[] {
    const value = this.load(this.KEY_ROW_RELATION_FILTER);
    return value ? JSON.parse(value) : [];
  }

  /**
   * 행 관계 필터를 저장
   * @param value 관계 ID 배열
   */
  static saveRowRelationFilter(value: number[]): void {
    this.save(this.KEY_ROW_RELATION_FILTER, JSON.stringify(value));
  }

  /**
   * 저장된 행 이름 필터를 불러옴
   * @returns 이름 필터 배열
   */
  static loadRowNameFilter(): string[] {
    const value = this.load(this.KEY_ROW_NAME_FILTER);
    return value ? JSON.parse(value) : [];
  }

  /**
   * 행 이름 필터를 저장
   * @param value 이름 필터 배열
   */
  static saveRowNameFilter(value: string[]): void {
    this.save(this.KEY_ROW_NAME_FILTER, JSON.stringify(value));
  }

  /**
   * 저장된 열 관계 필터를 불러옴
   * @returns 관계 ID 배열
   */
  static loadColumnRelationFilter(): number[] {
    const value = this.load(this.KEY_COLUMN_RELATION_FILTER);
    return value ? JSON.parse(value) : [];
  }

  /**
   * 열 관계 필터를 저장
   * @param value 관계 ID 배열
   */
  static saveColumnRelationFilter(value: number[]): void {
    this.save(this.KEY_COLUMN_RELATION_FILTER, JSON.stringify(value));
  }

  /**
   * 저장된 열 이름 필터를 불러옴
   * @returns 이름 필터 배열
   */
  static loadColumnNameFilter(): string[] {
    const value = this.load(this.KEY_COLUMN_NAME_FILTER);
    return value ? JSON.parse(value) : [];
  }

  /**
   * 열 이름 필터를 저장
   * @param value 이름 필터 배열
   */
  static saveColumnNameFilter(value: string[]): void {
    this.save(this.KEY_COLUMN_NAME_FILTER, JSON.stringify(value));
  }
}
