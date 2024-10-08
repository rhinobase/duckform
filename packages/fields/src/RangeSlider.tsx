"use client";
import {
  Slider as RaftySlider,
  type Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@rafty/ui";
import { useBlueprint, useDuckForm, useField } from "duck-form";
import { useId, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type RangeSliderProps = Pick<Slider, "min" | "max" | "step"> & {
  type: "rangeSlider";
  defaultValue?: [number, number];
};

export function RangeSliderField() {
  const props = useField<RangeSliderProps>();
  const { control } = useFormContext();

  const { generateId } = useDuckForm();
  const { schema } = useBlueprint();

  const autoId = useId();
  const customId = useMemo(
    () => generateId?.(schema, props),
    [generateId, schema, props],
  );

  const componentId = customId ?? autoId;

  return (
    <Controller
      name={componentId}
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <RaftySlider
          {...props}
          {...field}
          value={value}
          defaultValue={[0, 0]}
          onValueChange={(value) => onChange(value.splice(0, 2))}
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb />
          <SliderThumb />
        </RaftySlider>
      )}
    />
  );
}
