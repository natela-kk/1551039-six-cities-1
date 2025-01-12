export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInteface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  CategoryServiceInterface: Symbol.for('CategoryServiceInterface'),
  CategoryModel: Symbol.for('CategoryModel'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  OfferModel: Symbol.for('OfferModel'),
  ExeptionFilterInterface: Symbol.for('ExeptionFilterInterface'),
  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController')
} as const;
