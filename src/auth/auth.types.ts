export interface IAuthInput {
  username: string;
  password: string;
}

export interface ISignInData {
  userId: string;
  username: string;
}

export interface IAuthResult {
  accessToken: string;
  userId: string;
  username: string;
}
