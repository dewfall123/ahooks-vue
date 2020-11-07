export function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString(36).slice(2));
    }, 1 * 1000);
  });
}

export function getNumber(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString().slice(2));
    }, 0.5 * 1000);
  });
}
