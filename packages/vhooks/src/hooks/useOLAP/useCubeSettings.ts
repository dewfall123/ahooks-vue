import { reactive, toRefs, computed, isRef, watch } from 'vue';
import {
  Options,
  CubeSettings,
  ColumnsRef,
  COUNT_FIELD,
  CountField,
} from './type';

export function useCubeSettings<T>(
  columns: ColumnsRef<T>,
  passedOptions: Options = {},
  defaultValues: CubeSettings<T> = {},
) {
  const state = reactive({
    settings: {
      dimension: defaultValues.dimension,
      measure: defaultValues.measure,
      series: defaultValues.series,
      bySeries: defaultValues.bySeries ?? false,
      countField: defaultValues.countField ?? COUNT_FIELD,
    } as CubeSettings<T>,
  });

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
        !state.settings.dimension ||
        !dimensionOptions.value[state.settings.dimension as string]
      ) {
        state.settings.dimension = Object.keys(
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
        !state.settings.measure ||
        !measureOptions.value[state.settings.measure as string]
      ) {
        state.settings.measure = Object.keys(
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
        !state.settings.series ||
        !seriesOptions.value[state.settings.series as string]
      ) {
        state.settings.series = Object.keys(
          seriesOptions.value ?? {},
        )[0] as any;
      }
    },
    { immediate: true },
  );

  const options = computed(() => ({
    dimension: dimensionOptions.value,
    measure: measureOptions.value,
    series: seriesOptions.value,
  }));

  return {
    ...toRefs(state),
    options,
  };
}
