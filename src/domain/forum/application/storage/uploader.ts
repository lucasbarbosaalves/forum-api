export type UploadeParams = {
  fileName: string;
  fileType: string;
  body: Buffer;
};

export abstract class Uploader {
  abstract upload(file: UploadeParams): Promise<{ url: string }>;
}
