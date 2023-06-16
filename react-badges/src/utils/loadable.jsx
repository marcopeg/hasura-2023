/**
 * Small equivalent to:
 * https://loadable-components.com/docs/getting-started/
 *
 * So far we don't know if we are going to use the full
 * capabilities of the library.
 *
 * When you bring the library in just replace:
 *
 * ```js
 * import { loadable } from "./loadable";
 * ```
 *
 * with
 *
 * ```js
 * import loadable from '@loadable/component'
 * ```
 *
 * Of course, remember to install it:
 *
 * ```bash
 * npm add @loadable/component
 * ```
 */

import { lazy, Suspense } from "react";

const applySuspense = (Component) => () =>
  (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );

export const loadable = (module) => applySuspense(lazy(module));
