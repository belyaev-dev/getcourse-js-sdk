import { GetCourse } from './entities';
import { JSONValue } from "./utility";

export type Options = {
  request_delay: number;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type GetCourseAction = "add" | "update" | "get";

export type RequestInit = {
  url: string;
  url_base?: string;
  query?: string;
  action?: GetCourseAction;
  params?: Record<string, unknown>;
  headers?: Record<string, string | number | boolean>;
};