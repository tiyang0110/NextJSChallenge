export const PASSWORD_REGEX = new RegExp(/^(?=.*\d).+$/);
export const PASSWORD_REGEX_ERROR = '비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다.';

export interface zodResultProps {
  success: boolean;
  formErrors: string[];
  fieldErrors: {
      email?: string[];
      password?: string[];
  };
}