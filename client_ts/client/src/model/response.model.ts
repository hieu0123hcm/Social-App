export interface APIResponse<dataType> {
  success: boolean;
  message: string;
  data: dataType;
}
