export class CommonUtils {
  /**
   * Checks whether the obj is non-empty array.
   * @param obj The object to be checked
   */
  public static isNonEmptyArray(obj: any): boolean {
    return obj instanceof Array && obj.length > 0;
  }
  /**
   * Checks whether the obj is null or undefined or empty.
   * @param obj The object to be checked
   */
  public static isEmpty(obj: any): boolean {
    return obj === undefined || obj === null || obj.length === 0;
  }
  /**
   * Checks whether the object is an empty string, null, or undefined.
   * @param obj The object to be checked
   * @returns true if the object passed is null, undefined, or empty string
   */
  public static isEmptyString(obj: any): boolean {
    return obj === undefined || obj === null || this.safeTrim(obj) === "";
  }
  /**
   * Safely trim an object string.
   * @param obj The object that needs to be a string
   */
  public static safeTrim(obj: any): string {
    return !this.isEmpty(obj) && typeof obj === "string" ? obj.trim() : "";
  }
  /**
   * Converts a string number to number.
   * @param num The number to be converted
   */
  public static parseInt(num: string | number | undefined): number {
    if (typeof num === "number") {
      return num;
    }
    if (num === null || num === undefined || isNaN(parseInt(num, 10))) {
      return 0;
    }
    return parseInt(num, 10);
  }
}
