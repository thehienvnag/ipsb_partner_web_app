export default class RouteNames {
  static withId = (route) => `${route}/:id`;
  //#region Building Managers
  static buildingManager = "building-manager";
  static floorPlans = "/floor-plans";
  static stores = "/stores";
  static locatorTags = "/locator-tags";
  static places = "/places";
  static storeAccounts = "/store-accounts";
  //#endregion
  //#region Admin
  static admin = "admin";
  static buildings = "/buildings";
  static managerAccounts = "/manager-accounts";
  //#endregion
}
