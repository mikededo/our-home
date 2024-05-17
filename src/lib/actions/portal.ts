import type { Action } from 'svelte/action';

export const portal: Action<HTMLElement, string | undefined> = (node, name = 'default-portal') => {
  if (name) {
    let portal = document.getElementById(name);
    if (!portal) {
      console.error(`Portal with name "${name}" not found`);
      return;
    }

    portal.replaceChildren(node);
  } else {
    document.body.appendChild(node);
  }

  return {
    destroy() {
      node.remove();
    }
  };
};
