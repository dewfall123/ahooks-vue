import { isRef, ref, computed } from 'vue-demi';
import {
  SourceData,
  Columns,
  CubeOptions,
  CubeSettings,
  SourceDataRef,
  ColumnsRef,
  Cube,
  PassedInCubeOptions,
} from './type';
import { useFilters } from './useFilters';
import { useCubeSettings } from './useCubeSettings';
import { useCubeData } from './useCubeData';

export type {
  SourceData,
  Columns,
  PassedInCubeOptions,
  CubeOptions,
  CubeSettings,
  Cube,
};
export { OPERATOR } from './type';

export function useOLAP<T>(
  data: SourceData<T>,
  setting: {
    // 字段名映射
    columns?: Columns<T>;
    // 维度设置默认值
    defaultValues?: CubeSettings<T>;
    // 可选维度
    options?: PassedInCubeOptions;
  } = {},
) {
  if (!isRef(data)) {
    data = ref(data) as SourceDataRef<T>;
  }

  if (!setting.columns) {
    setting.columns = computed(() =>
      Object.keys((data as SourceDataRef<T>).value[0] ?? []).reduce(
        (obj, i) => {
          obj[i as keyof T] = i;
          return obj;
        },
        {} as Record<keyof T, string>,
      ),
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

  const { cube, chartCube } = useCubeData<T>(
    data,
    filter.list as any,
    cubeSettings,
  );

  return {
    cube,
    chartCube,
    columns: setting.columns,
    cubeSettings,
    cubeOptions,
    filter,
  };
}
