import { isRef, ref, computed } from 'vue';
import {
  dataSource,
  Columns,
  Options,
  CubeSettings,
  dataSourceRef,
} from './type';
import { useFilters } from './useFilters';
import { useCubeSettings } from './useCubeSettings';
import { useCubeData } from './useCubeData';

export { OPERATOR, dataSource, Columns, Options, CubeSettings } from './type';

export function useCube(
  data: dataSource,
  setting: {
    columns?: Columns;
    options?: Options;
    defaultValues?: CubeSettings;
  } = {},
) {
  if (!isRef(data)) {
    data = ref(data) as dataSourceRef;
  }

  if (!setting.columns) {
    setting.columns = computed(() =>
      Object.keys((data as dataSourceRef).value[0] ?? []).reduce((obj, i) => {
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
