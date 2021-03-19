import { reactive, computed, isRef, watch } from 'vue-demi';
import {
  PassedInCubeOptions,
  CubeSettings,
  ColumnsRef,
  COUNT_FIELD,
  CountField,
} from './type';

export function useCubeSettings<T>(
  columns: ColumnsRef<T>,
  passedOptions: PassedInCubeOptions = {},
  defaultValues: CubeSettings<T> = {},
) {
  const cubeSettings = reactive<CubeSettings<T>>({
    dimension: defaultValues.dimension,
    measure: defaultValues.measure,
    series: defaultValues.series,
    countField: defaultValues.countField ?? COUNT_FIELD,
  }) as CubeSettings<T>;

  const dimensionOptions = computed(() => {
    if (passedOptions.dimensions) {
      return isRef(passedOptions.dimensions)
        ? passedOptions.dimensions.value
        : passedOptions.dimensions;
    }
    return columns.value;
  });

  const measureOptions = computed(() => {
    if (passedOptions.measures) {
      return isRef(passedOptions.measures)
        ? passedOptions.measures.value
        : passedOptions.measures;
    }
    return {
      [COUNT_FIELD]: '次数',
      ...columns.value,
    } as Record<CountField | keyof T, string>;
  });

  const seriesOptions = computed(() => {
    if (passedOptions.series) {
      return isRef(passedOptions.series)
        ? passedOptions.series.value
        : passedOptions.series;
    }
    return columns.value;
  });

  watch(
    dimensionOptions,
    () => {
      if (
        !cubeSettings.dimension ||
        !dimensionOptions.value[cubeSettings.dimension as string]
      ) {
        cubeSettings.dimension = Object.keys(
          dimensionOptions.value ?? {},
        )[0] as any;
      }
    },
    { immediate: true },
  );

  watch(
    measureOptions,
    () => {
      if (
        !cubeSettings.measure ||
        !measureOptions.value[cubeSettings.measure as string]
      ) {
        cubeSettings.measure = Object.keys(
          measureOptions.value ?? {},
        )[0] as any;
      }
    },
    { immediate: true },
  );

  watch(
    seriesOptions,
    () => {
      if (
        !cubeSettings.series ||
        !seriesOptions.value[cubeSettings.series as string]
      ) {
        cubeSettings.series = Object.keys(seriesOptions.value ?? {})[0] as any;
      }
    },
    { immediate: true },
  );

  const cubeOptions = computed(() => ({
    dimension: dimensionOptions.value,
    measure: measureOptions.value,
    series: seriesOptions.value,
  }));

  return {
    cubeSettings,
    cubeOptions,
  };
}
