export class CreateAuthorDto {
  firstName: string;

  lastName: string;
}

export function isString(data: any): boolean {
  return typeof data === 'string';
}

export function validAuthor(input: CreateAuthorDto): void {
  if (!isString(input.firstName) || !isString(input.lastName)) {
    throw new Error('Author not valid');
  }
}