import { isRef, ref, computed } from '@vue/composition-api';
import {
  SourceData,
  Columns,
  Options,
  CubeSettings,
  SourceDataRef,
} from './type';
import { useFilters } from './useFilters';
import { useCubeSettings } from './useCubeSettings';
import { useCubeData } from './useCubeData';

export type {  SourceData, Columns, Options, CubeSettings };
export { OPERATOR } from './type'


export function useCube(
  data: SourceData,
  setting: {
    columns?: Columns;
    options?: Options;
    defaultValues?: CubeSettings;
  } = {},
) {
  if (!isRef(data)) {
    data = ref(data) as SourceDataRef;
  }

  if (!setting.columns) {
    setting.columns = computed(() =>
      Object.keys((data as SourceDataRef).value[0] ?? []).reduce((obj, i) => {
        obj[i] = i;
        return obj;
      }, {} as Record<string, string>),
    );
  }

  if (!isRef(setting.columns)) {
    setting.columns = ref(setting.columns);
  }

  const filter = useFilters(data, setting.columns);

  const cubeSettings = useCubeSettings(
    setting.columns,
    setting.options,
    setting.defaultValues,
  );

  const { cube } = useCubeData(data, filter.list, cubeSettings.settings);

  return {
    cube,
    columns: setting.columns,
    cubeSettings,
    filter,
  };
}

export default useCube;
