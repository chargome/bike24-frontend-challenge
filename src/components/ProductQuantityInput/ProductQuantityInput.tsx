import React from 'react';

interface Props {
  maxAmount: number;
  value: number;
  setValue: (value: number) => void;
  disabled: boolean;
}

export const ProductQuantityInput = ({
  maxAmount,
  value,
  setValue,
  disabled,
}: Props): JSX.Element => {
  const getValueOrMaxAmount = React.useCallback(
    (value: number) => {
      return Math.max(1, Math.min(maxAmount, value));
    },
    [maxAmount],
  );

  const handleValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(getValueOrMaxAmount(Number(e.target.value)));
    },
    [getValueOrMaxAmount, setValue],
  );

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Amount:</span>
      </label>

      <div className="flex items-center gap-1">
        <input
          type="range"
          min={1}
          max={maxAmount}
          onChange={handleValueChange}
          value={value}
          className="range range-primary"
          disabled={disabled}
        />
        <input
          type="number"
          min={1}
          max={maxAmount}
          onChange={handleValueChange}
          value={value}
          className="input input-bordered input-primary max-w-xs"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
