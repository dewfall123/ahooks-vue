import { ObjectDirective } from 'vue-demi';

const vue3LifecycleToVue2 = {
  beforeMount: 'bind',
  mounted: 'inserted',
  // beforeUpdate new,
  updated: 'update',
  // componentUpdated: 'updated',
  // beforeUnmount new
  unmounted: 'unbind',
} as Record<string, string>;

export function CompatibleWithVue2(directive: ObjectDirective) {
  for (const key in directive) {
    const vue2Key = vue3LifecycleToVue2[key] as string;
    if (!vue2Key) {
      //
      console.log(`${key} cannot compat to vue2`);
      continue;
    }
    // @ts-ignore
    directive[vue2Key] = directive[key];
  }
  return directive;
}
