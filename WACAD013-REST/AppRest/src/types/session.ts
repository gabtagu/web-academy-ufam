declare module "express-session" {
  interface SessionData {
    uid: string;
    userTypeId: string;
  }
}
