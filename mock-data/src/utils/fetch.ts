export default (options?: RequestInit | undefined) => (url: string) => {
  return fetch(url, options)
    .then((res) => res.json())
    .catch(() => {
      throw new Error('response is not json');
    });
};
