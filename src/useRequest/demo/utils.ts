export const Name = 'yexiu';
export const Prefix = 'T-';
export const getFullNameTime = 1 * 1000;
export const Error = 'something error';

export function getFullName(name?: string, isError?: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) {
        reject(Error);
      } else {
        resolve(name ? `${Prefix}${name}` : Name);
      }
    }, getFullNameTime);
  });
}

let n = 0;
export const getNumberTime = 0.5 * 1000;
export function getNumber(): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(n++);
    }, getNumberTime);
  });
}
