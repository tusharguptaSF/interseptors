import {
  Context, inject, injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise
} from '@loopback/core';
import {GlobalCounter} from '../application';
/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({tags: {key: CheckInterceptor.BINDING_KEY}})
export class CheckInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${CheckInterceptor.name}`;


  constructor(@inject.context()
  private resolutionCtx: Context) {

  }


  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      console.log("check Intercepter befor");

      const result = await next();
      console.log("check Intercepter after");
      const c1: GlobalCounter = this.resolutionCtx.getSync('global-counter');
      c1.count++;
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Acheck-interceptorcheck-interceptordd error handling logic here
      throw err;
    }
  }
  async check(name: string) {
    return name + " Hello Int";
  }
}
