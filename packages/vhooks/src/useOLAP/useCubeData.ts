import { Ref, computed } from 'vue-demi';
import { Filter, SourceDataRef, CubeSettings } from './type';
import { operatorFn } from './constants';

export function useCubeData<T>(
  data: SourceDataRef<T>,
  filters: Ref<Filter<T>[]>,
  cubeSettings: CubeSettings<T>,
) {
  const cube = computed(() => {
    const filteredData = data.value.filter((dataItem) => {
      for (const { field, operator, value } of filters.value) {
        const opFn = operatorFn[operator];
        if (!opFn(dataItem[field as keyof T], value)) {
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
      aggByDimension,
    } = cubeSettings;

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
    let cube = [];
    if (bySeries) {
      const cubeTree = {} as Record<any, any>;
      for (const item of filteredData) {
        if (!((dimension as string) in item)) {
          continue;
        }
        const dimensionValue = item[dimension as keyof T] as any;
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
        if (!((dimension as string) in item)) {
          continue;
        }
        setMeasure(cubeTree, item[dimension as keyof T] as any, item);
      }

      for (const dimensionValue in cubeTree) {
        cube.push({
          [dimension]: dimensionValue,
          [measure]: cubeTree[dimensionValue],
        });
      }
    }

    // 把dimension相同的放在同一行
    if (bySeries && aggByDimension) {
      const mapByDimension = {} as Record<string, any>;
      for (const item of cube) {
        const dimensionValue = item[dimension as string];
        const seriesValue = item[series as string];
        const measureValue = item[measure as string];
        if (mapByDimension[dimensionValue]) {
          mapByDimension[dimensionValue][seriesValue] = measureValue;
        } else {
          mapByDimension[dimensionValue] = {
            [dimension]: dimensionValue,
            [seriesValue]: measureValue,
          };
        }
      }
      cube = Object.values(mapByDimension);
    }

    return cube;
  });

  return {
    cube,
  };
}
