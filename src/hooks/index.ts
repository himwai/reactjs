import { useWebService } from "./WebService";
import type { CounterRequest, CounterResult, UseCountReturn } from "./Counter";
import { useCounter } from "./Counter";

export type { CounterRequest, CounterResult, UseCountReturn };
export { useWebService, useCounter };
