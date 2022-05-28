export type EntryData<U> = {
  [key: string | number]: U;
};

export type ResponseData<T = void> = {
  errorCode: number;
  errorMessage: string;
  sessionId: string;
  data: T;
};
