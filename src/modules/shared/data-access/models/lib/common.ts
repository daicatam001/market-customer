export type EntryData<U> = {
  [key: string | number]: U;
};

export type ResponseData = {
  errorCode: number;
  errorMessage: string;
  sessionId: string;
}