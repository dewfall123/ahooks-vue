import { Ref, computed } from 'vue-demi';
import { Filter, SourceDataRef, CubeSettings, ChartCube, Cube } from './type';
import { EmptyValue, operatorFn } from './constants';

export function useCubeData<T>(
  data: SourceDataRef<T>,
  filters: Ref<Filter<T>[]>,
  cubeSettings: CubeSettings<T>,
) {
  function setMeasure(
    tree: Record<string, number>,
    key: string,
    item: Record<string, any>,
    measure: string,
    countField: string | undefined,
  ) {
    if (tree[key]) {
      tree[key] +=
        measure === countField ? 1 : Number(item[measure as string]) || 0;
    } else {
      tree[key] =
        measure === countField ? 1 : Number(item[measure as string]) || 0;
    }
  }

  const filteredData = computed(() => {
    return data.value.filter(dataItem => {
      for (const { field, operator, value } of filters.value) {
        const opFn = operatorFn[operator];
        if (!opFn(dataItem[field as keyof T], value)) {
          return false;
        }
      }
      return true;
    });
  });

  // 一维聚合 使用series
  const cubeD1: Cube = computed(() => {
    const { measure, series, countField } = cubeSettings;

    if (!measure || !series) {
      return [];
    }

    // agg by series
    let cube = [];
    const cubeTree = {} as Record<string, number>;
    for (const item of filteredData.value) {
      if (!((series as string) in item)) {
        continue;
      }
      setMeasure(
        cubeTree,
        item[series as keyof T] as any,
        item,
        measure as string,
        countField,
      );
    }

    for (const dimensionValue in cubeTree) {
      cube.push({
        [series]: String(dimensionValue) || EmptyValue,
        [measure]: cubeTree[dimensionValue],
      });
    }

    // 默认按照dimension从小到大排序
    cube = cube.sort((a, b) => {
      return a[series as string] < b[series as string] ? -1 : 1;
    });

    return cube;
  });

  // 二维聚合
  const cubeD2: Cube = computed(() => {
    const { dimension, measure, series, countField } = cubeSettings;

    if (!measure || !series || !dimension) {
      return [];
    }

    let cube = [];
    const cubeTree = {} as Record<any, any>;
    for (const item of filteredData.value) {
      if (!((dimension as string) in item)) {
        continue;
      }
      const dimensionValue = String(
        item[dimension as keyof T] || EmptyValue,
      ) as any;
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
        setMeasure(
          subCubeTree,
          String(item[series as keyof T] || EmptyValue) as any,
          item,
          measure as string,
          countField,
        );
      }

      for (const seriesValue in subCubeTree) {
        cube.push({
          [dimension]: dimensionValue,
          [series as string]: seriesValue,
          [measure]: subCubeTree[seriesValue],
        });
      }
    }

    // 默认按照dimension从小到大排序
    cube = cube.sort((a, b) => {
      return a[dimension as string] < b[dimension as string] ? -1 : 1;
    });

    return cube;
  });

  const chartCubeD1: ChartCube = computed(() => {
    const { series, measure } = cubeSettings;
    return {
      columns: [series as string, measure as string],
      rows: cubeD1.value,
    };
  });

  const chartCubeD2: ChartCube = computed(() => {
    const { dimension, series, measure } = cubeSettings;

    const columns: string[] = [dimension as string];
    const seriesValues = Array.from(
      new Set(cubeD2.value.map(item => item[series as string])),
    ) as string[];
    columns.push(...seriesValues);

    let rows = cubeD2.value;
    // 二维数据  把dimension聚合到一行
    const mapByDimension = {} as Record<string, any>;
    for (const item of rows) {
      const dimensionValue = item[dimension as string];
      const seriesValue = item[series as string];
      const measureValue = item[measure as string];
      if (mapByDimension[dimensionValue]) {
        mapByDimension[dimensionValue][seriesValue] = measureValue;
      } else {
        mapByDimension[dimensionValue] = {
          [dimension!]: dimensionValue,
          [seriesValue]: measureValue,
        };
      }
    }

    rows = Object.values(mapByDimension);

    return {
      columns,
      rows,
    };
  });

  return {
    cubeD1,
    cubeD2,
    chartCubeD1,
    chartCubeD2,
  };
}
