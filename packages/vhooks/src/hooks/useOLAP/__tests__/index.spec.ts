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
import { ref, nextTick } from 'vue';
import { COUNT_FIELD } from '../type';

// vue2-import-slot

describe('useOLAP', () => {
  // vue2-beforeAll-slot
  it('should be defined', () => {
    expect(useOLAP).toBeDefined();
  });

  it('should work with only one arg', () => {
    const { cube, cubeSettings } = useOLAP<DataSchema>(data);

    expect(cubeSettings.settings.value.dimension).toEqual('date');
    expect(cubeSettings.settings.value.measure).toEqual(COUNT_FIELD);
    expect(cubeSettings.settings.value.series).toEqual('date');

    expect(cubeSettings.options.value.dimension).toEqual(
      Object.keys(data[0]).reduce((obj, i) => ({ [i]: i, ...obj }), {}),
    );

    expect(cube.value).toEqual(date__count);

    cubeSettings.settings.value.dimension = 'name';
    expect(cube.value).toEqual(name__count);

    cubeSettings.settings.value.measure = 'score';
    expect(cube.value).toEqual(name_score);

    cubeSettings.settings.value.bySeries = true;
    cubeSettings.settings.value.series = 'name';
    cubeSettings.settings.value.measure = 'score';
    cubeSettings.settings.value.dimension = 'date';
    expect(cube.value).toEqual(date_name_score);
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

    expect(cubeSettings.settings.value.dimension).toEqual('name');
    expect(cubeSettings.settings.value.measure).toEqual('score');
    expect(cubeSettings.settings.value.series).toEqual('date');

    expect(cube.value).toEqual(name_score);

    cubeSettings.settings.value.bySeries = true;
    expect(cube.value).toEqual(name_date_score);
  });

  it('the options arg should work', () => {
    const { cube, cubeSettings } = useOLAP<DataSchema>(data, {
      columns,
      options: {
        dimensions: dimensionOptionsArg,
        measures: measureOptionsArg,
        series: seriesOptionsArg,
      },
    });

    expect(cubeSettings.settings.value.dimension).toEqual('date');
    expect(cubeSettings.settings.value.measure).toEqual('score');
    expect(cubeSettings.settings.value.series).toEqual('name');

    expect(cubeSettings.options.value.dimension).toEqual(dimensionOptionsArg);
    expect(cubeSettings.options.value.measure).toEqual(measureOptionsArg);
    expect(cubeSettings.options.value.series).toEqual(seriesOptionsArg);

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
    expect(cubeSettings.settings.value.dimension).toEqual(undefined);
    expect(cubeSettings.settings.value.measure).toEqual('score');

    dimensionOptionsRef.value = dimensionOptionsArg;
    dataRef.value = data;

    nextTick(() => {
      expect(cubeSettings.settings.value.dimension).toEqual('date');
      expect(cube.value).toEqual(date_score);
    });
  });
});
