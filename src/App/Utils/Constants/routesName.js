export default class RouteNames {
  static withId = (route) => `${route}/:id`;
  //#region Building Managers
  static buildingManager = "building-manager";
  static floorPlans = "/floor-plans";
  static stores = "/stores";
  static locatorTags = "/locator-tags";
  static places = "/places";
  static storeAccounts = "/store-accounts";
  static facilities = "/facilities";
  //#endregion
  //#region Admin
  static admin = "admin";
  static buildings = "/buildings";
  static managerAccounts = "/manage-accounts";
  static locationTypes = "/location-types";
  static couponTypes = "/coupon-types";
  //#endregion
  //#region Store Owners
  static managerCoupons = "/manage-coupons";
  static managerProducts = "/manage-products";
  static testCkeditor = "/testCkeditor";
  //#endregion
}
