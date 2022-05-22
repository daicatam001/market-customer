export type EntryData<U> = {
  [key: string | number]: U;
};

export type ResponseData<U, V extends string> = {
  errorCode: number;
  errorMessage: string;
  sectionId: string;
} &
 {
  [K in V]: U;
};
