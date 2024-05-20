import { getContext, setContext } from 'svelte';

const CONTEXT_KEY = 'header';
let headerState = $state({ condensed: false, focused: false, value: '' });

export const initHeader = () => setContext(CONTEXT_KEY, headerState);

export const getHeaderContext = () => {
  const context = getContext<typeof headerState>(CONTEXT_KEY);
  if (!context) {
    throw new Error(
      'Unable to find HeaderContext client on the tree. Make sure to use `initHeaderContext` on the root component.'
    );
  }

  return context;
};
