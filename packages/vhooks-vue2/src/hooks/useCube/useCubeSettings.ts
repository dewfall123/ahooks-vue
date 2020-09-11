import { reactive, toRefs, computed, isRef, watch } from '@vue/composition-api';
import { Options, CubeSettings, ColumnsRef } from './type';

export function useCubeSettings(
  columns: ColumnsRef,
  passedOptions: Options = {},
  defaultValues: CubeSettings = {},
) {
  const state = reactive({
    settings: {
      dimension: defaultValues.dimension,
      measure: defaultValues.measure,
      series: defaultValues.series,
      bySeries: defaultValues.bySeries ?? false,
      countField: defaultValues.countField ?? '_count',
    } as CubeSettings,
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
      [state.settings.countField as string]: '次数',
      ...columns.value,
    };
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
        !dimensionOptions.value[state.settings.dimension]
      ) {
        state.settings.dimension = Object.keys(dimensionOptions.value ?? {})[0];
      }
    },
    { immediate: true },
  );

  watch(
    measureOptions,
    () => {
      if (
        !state.settings.measure ||
        !measureOptions.value[state.settings.measure]
      ) {
        state.settings.measure = Object.keys(measureOptions.value ?? {})[0];
      }
    },
    { immediate: true },
  );

  watch(
    seriesOptions,
    () => {
      if (
        !state.settings.series ||
        !seriesOptions.value[state.settings.series]
      ) {
        state.settings.series = Object.keys(seriesOptions.value ?? {})[0];
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
