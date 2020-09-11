import { Ref, computed } from 'vue';
import { Filter, SourceDataRef, CubeSettings } from './type';
import { operatorFn } from './constants';

export function useCubeData(
  data: SourceDataRef,
  filters: Ref<Filter[]>,
  cubeSettings: Ref<CubeSettings>,
) {
  const cube = computed(() => {
    const filteredData = data.value.filter((dataItem) => {
      for (const { field, operator, value } of filters.value) {
        const opFn = operatorFn[operator];
        if (!opFn(dataItem[field], value)) {
          return false;
        }
      }
      return true;
    });

    const {
      dimension,
      measure,
      series,
      bySeries,
      countField,
    } = cubeSettings.value;

    if (!dimension || !measure || (bySeries && !series)) {
      return [];
    }

    function setMeasure(
      tree: Record<string, number>,
      key: string,
      item: Record<string, any>,
    ) {
      if (tree[key]) {
        tree[key] +=
          measure === countField ? 1 : Number(item[measure as string]) || 0;
      } else {
        tree[key] =
          measure === countField ? 1 : Number(item[measure as string]) || 0;
      }
    }

    // agg by series
    const cube = [];
    if (bySeries) {
      let cubeTree = {} as Record<string, any>;
      for (const item of filteredData) {
        if (!item.hasOwnProperty(dimension as string)) {
          continue;
        }
        const dimensionValue = item[dimension as string] as string;
        if (cubeTree[dimensionValue]) {
          cubeTree[dimensionValue].push(item);
        } else {
          cubeTree[dimensionValue] = [item];
        }
      }

      //
      for (const dimensionValue in cubeTree) {
        const subCubeTree = {} as Record<string, number>;
        for (const item of cubeTree[dimensionValue]) {
          if (!item.hasOwnProperty(series)) {
            continue;
          }
          setMeasure(subCubeTree, item[series as string], item);
        }

        for (const seriesValue in subCubeTree) {
          cube.push({
            [dimension]: dimensionValue,
            [series as string]: seriesValue,
            [measure]: subCubeTree[seriesValue],
          });
        }
      }
    } else {
      const cubeTree = {} as Record<string, number>;
      for (const item of filteredData) {
        if (!item.hasOwnProperty(dimension)) {
          continue;
        }
        setMeasure(cubeTree, item[dimension], item);
      }

      for (const dimensionValue in cubeTree) {
        cube.push({
          [dimension]: dimensionValue,
          [measure]: cubeTree[dimensionValue],
        });
      }
    }

    return cube;
  });

  return {
    cube,
  };
}
