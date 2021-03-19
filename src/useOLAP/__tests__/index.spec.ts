import { useOLAP, OPERATOR } from '../index';
import {
  data,
  columns,
  date__count,
  name__count,
  name_score,
  date_name_score,
  // name_date_score,
  date_score,
  dimensionOptionsArg,
  measureOptionsArg,
  seriesOptionsArg,
  date__count_filtered_age,
  DataSchema,
  date_name_score_chartCube,
} from '../demo/data';
import { ref, nextTick } from 'vue-demi';
import { COUNT_FIELD } from '../type';

describe('useOLAP', () => {
  it('should be defined', () => {
    expect(useOLAP).toBeDefined();
  });

  it('should work with only one arg', async () => {
    const { cubeD1, cubeD2, cubeSettings, cubeOptions } = useOLAP<DataSchema>(
      data,
    );

    expect(cubeSettings.dimension).toEqual('date');
    expect(cubeSettings.measure).toEqual(COUNT_FIELD);
    expect(cubeSettings.series).toEqual('date');

    expect(cubeOptions.value.dimension).toEqual(
      Object.keys(data[0]).reduce((obj, i) => ({ [i]: i, ...obj }), {}),
    );

    expect(cubeD1.value).toEqual(date__count);

    cubeSettings.series = 'name';
    await nextTick(() => {
      expect(cubeD1.value).toEqual(name__count);
    });

    cubeSettings.measure = 'score';
    await nextTick(() => {
      expect(cubeD1.value).toEqual(name_score);
    });

    cubeSettings.dimension = 'date';
    cubeSettings.series = 'name';
    cubeSettings.measure = 'score';
    await nextTick(() => {
      expect(cubeD1.value).toEqual(name_score);
      expect(cubeD2.value).toEqual(date_name_score);
    });
  });

  it('the default values arg should work', async () => {
    const { cubeD1, cubeD2, cubeSettings } = useOLAP<DataSchema>(data, {
      columns,
      defaultValues: {
        series: 'name',
        measure: 'score',
      },
    });

    expect(cubeSettings.dimension).toEqual('date');
    expect(cubeSettings.measure).toEqual('score');
    expect(cubeSettings.series).toEqual('name');

    expect(cubeD1.value).toEqual(name_score);

    expect(cubeD2.value).toEqual(date_name_score);
  });

  it('the options arg should work', () => {
    const { cubeD1, cubeD2, cubeSettings, cubeOptions } = useOLAP<DataSchema>(
      data,
      {
        columns,
        options: {
          dimensions: dimensionOptionsArg,
          measures: measureOptionsArg,
          series: seriesOptionsArg,
        },
      },
    );

    expect(cubeSettings.dimension).toEqual('date');
    expect(cubeSettings.measure).toEqual('score');
    expect(cubeSettings.series).toEqual('name');

    expect(cubeOptions.value.dimension).toEqual(dimensionOptionsArg);
    expect(cubeOptions.value.measure).toEqual(measureOptionsArg);
    expect(cubeOptions.value.series).toEqual(seriesOptionsArg);

    expect(cubeD1.value).toEqual(name_score);
    expect(cubeD2.value).toEqual(date_name_score);
  });

  it('should work with filter', () => {
    const { cubeD1, filter } = useOLAP<DataSchema>(data);

    expect(cubeD1.value).toEqual(date__count);

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

    expect(cubeD1.value).toEqual(date__count_filtered_age);

    filter.list.value.splice(0, 1);
    expect(filter.list.value).toEqual([]);
    expect(cubeD1.value).toEqual(date__count);
  });

  it('should work with data ref', () => {
    const dataRef = ref([] as any[]);
    const { cubeD1 } = useOLAP<DataSchema>(dataRef);

    expect(cubeD1.value).toEqual([]);

    dataRef.value = data;
    nextTick(() => {
      expect(cubeD1.value).toEqual(date__count);
    });
  });

  it('should work with options ref', () => {
    const dataRef = ref([] as any[]);
    const dimensionOptionsRef = ref({});
    const measureOptionsRef = ref(measureOptionsArg);
    const seriesOptionsRef = ref(seriesOptionsArg);

    const { cubeD1, cubeSettings } = useOLAP<DataSchema>(dataRef, {
      options: {
        dimensions: dimensionOptionsRef,
        series: seriesOptionsRef,
        measures: measureOptionsRef,
      },
    });

    expect(cubeD1.value).toEqual([]);
    expect(cubeSettings.dimension).toEqual(undefined);
    expect(cubeSettings.measure).toEqual('score');

    dimensionOptionsRef.value = dimensionOptionsArg;
    dataRef.value = data;

    nextTick(() => {
      expect(cubeSettings.dimension).toEqual('date');
      expect(cubeD1.value).toEqual(date_score);
    });
  });

  it('should work with chartCube', async () => {
    const { chartCubeD2, cubeSettings } = useOLAP<DataSchema>(data);

    expect(cubeSettings.dimension).toEqual('date');
    expect(cubeSettings.measure).toEqual(COUNT_FIELD);
    expect(cubeSettings.series).toEqual('date');

    cubeSettings.dimension = 'date';
    cubeSettings.series = 'name';
    cubeSettings.measure = 'score';
    await nextTick(() => {
      expect(chartCubeD2.value).toEqual(date_name_score_chartCube);
    });
  });
});
