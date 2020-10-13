import { isRef, ref, computed } from 'vue-demi';
import {
  SourceData,
  Columns,
  Options,
  CubeSettings,
  SourceDataRef,
  ColumnsRef,
} from './type';
import { useFilters } from './useFilters';
import { useCubeSettings } from './useCubeSettings';
import { useCubeData } from './useCubeData';

export type {  SourceData, Columns, Options, CubeSettings };
export { OPERATOR } from './type'

export function useOLAP<T>(
  data: SourceData<T>,
  setting: {
    columns?: Columns<T>;
    defaultValues?: CubeSettings<T>;
    options?: Options;
  } = {},
) {
  if (!isRef(data)) {
    data = ref(data) as SourceDataRef<T>;
  }

  if (!setting.columns) {
    setting.columns = computed(() =>
      Object.keys((data as SourceDataRef<T>).value[0] ?? []).reduce((obj, i) => {
        obj[i as keyof T] = i;
        return obj;
      }, {} as Record<keyof T , string>),
    );
  }

  if (!isRef(setting.columns)) {
    setting.columns = ref(setting.columns) as ColumnsRef<T>;
  }

  const filter = useFilters(data, setting.columns);

  const { cubeSettings, cubeOptions } = useCubeSettings(
    setting.columns,
    setting.options,
    setting.defaultValues,
  );

  const { cube } = useCubeData<T>(data, filter.list as any, cubeSettings);

  return {
    cube,
    columns: setting.columns,
    cubeSettings,
    cubeOptions,
    filter,
  };
}

export default useOLAP;
