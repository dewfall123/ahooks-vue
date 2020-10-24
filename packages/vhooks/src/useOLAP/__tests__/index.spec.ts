import { useOLAP, OPERATOR } from '../index';
import {
  data,
  columns,
  date__count,
  name__count,
  name_score,
  date_name_score,
  name_date_score,
  date_score,
  dimensionOptionsArg,
  measureOptionsArg,
  seriesOptionsArg,
  date__count_filtered_age,
  DataSchema,
} from '../demo/data';
import { ref, nextTick } from 'vue-demi';
import { COUNT_FIELD } from '../type';

describe('useOLAP', () => {
  it('should be defined', () => {
    expect(useOLAP).toBeDefined();
  });

  it('should work with only one arg', async () => {
    const { cube, cubeSettings, cubeOptions } = useOLAP<DataSchema>(data);

    expect(cubeSettings.dimension).toEqual('date');
    expect(cubeSettings.measure).toEqual(COUNT_FIELD);
    expect(cubeSettings.series).toEqual('date');

    expect(cubeOptions.value.dimension).toEqual(
      Object.keys(data[0]).reduce((obj, i) => ({ [i]: i, ...obj }), {}),
    );

    expect(cube.value).toEqual(date__count);

    cubeSettings.dimension = 'name';
    expect(cube.value).toEqual(name__count);

    cubeSettings.measure = 'score';
    expect(cube.value).toEqual(name_score);

    cubeSettings.bySeries = true;
    cubeSettings.series = 'name';
    cubeSettings.measure = 'score';
    cubeSettings.dimension = 'date';
    nextTick(() => {
      expect(cube.value).toEqual(date_name_score);
    });
  });

  it('the default values arg should work', () => {
    const { cube, cubeSettings } = useOLAP<DataSchema>(data, {
      columns,
      defaultValues: {
        dimension: 'name',
        measure: 'score',
        bySeries: false,
      },
    });

    expect(cubeSettings.dimension).toEqual('name');
    expect(cubeSettings.measure).toEqual('score');
    expect(cubeSettings.series).toEqual('date');

    expect(cube.value).toEqual(name_score);

    cubeSettings.bySeries = true;
    nextTick(() => {
      expect(cube.value).toEqual(name_date_score);
    });
  });

  it('the options arg should work', () => {
    const { cube, cubeSettings, cubeOptions } = useOLAP<DataSchema>(data, {
      columns,
      options: {
        dimensions: dimensionOptionsArg,
        measures: measureOptionsArg,
        series: seriesOptionsArg,
      },
    });

    expect(cubeSettings.dimension).toEqual('date');
    expect(cubeSettings.measure).toEqual('score');
    expect(cubeSettings.series).toEqual('name');

    expect(cubeOptions.value.dimension).toEqual(dimensionOptionsArg);
    expect(cubeOptions.value.measure).toEqual(measureOptionsArg);
    expect(cubeOptions.value.series).toEqual(seriesOptionsArg);

    expect(cube.value).toEqual(date_score);
  });

  it('should work with filter', () => {
    const { cube, filter } = useOLAP<DataSchema>(data);

    expect(cube.value).toEqual(date__count);

    filter.cur.value.field = 'age';
    filter.cur.value.operator = OPERATOR.大于等于;
    filter.cur.value.value = 20;
    filter.addFilter();

    expect(filter.cur.value).toEqual({
      field: '',
      operator: OPERATOR.等于,
      value: '',
    });

    expect(filter.list.value).toEqual([
      {
        field: 'age',
        operator: OPERATOR.大于等于,
        value: 20,
      },
    ]);

    expect(cube.value).toEqual(date__count_filtered_age);

    filter.list.value.splice(0, 1);
    expect(filter.list.value).toEqual([]);
    expect(cube.value).toEqual(date__count);
  });

  it('should work with data ref', () => {
    const dataRef = ref([] as any[]);
    const { cube } = useOLAP<DataSchema>(dataRef);

    expect(cube.value).toEqual([]);

    dataRef.value = data;
    nextTick(() => {
      expect(cube.value).toEqual(date__count);
    });
  });

  it('should work with options ref', () => {
    const dataRef = ref([] as any[]);
    const dimensionOptionsRef = ref({});
    const measureOptionsRef = ref(measureOptionsArg);
    const seriesOptionsRef = ref(seriesOptionsArg);

    const { cube, cubeSettings } = useOLAP<DataSchema>(dataRef, {
      options: {
        dimensions: dimensionOptionsRef,
        series: seriesOptionsRef,
        measures: measureOptionsRef,
      },
    });

    expect(cube.value).toEqual([]);
    expect(cubeSettings.dimension).toEqual(undefined);
    expect(cubeSettings.measure).toEqual('score');

    dimensionOptionsRef.value = dimensionOptionsArg;
    dataRef.value = data;

    nextTick(() => {
      expect(cubeSettings.dimension).toEqual('date');
      expect(cube.value).toEqual(date_score);
    });
  });
});
