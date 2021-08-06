import rootRoute from "../router";

export enum Method {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

// @Route(Method.GET, '/api/xxx')
export function Route(method: Method, path: string) {
  return (
    _target: Object,
    _key: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    rootRoute[method](path, descriptor.value);
  };
}
