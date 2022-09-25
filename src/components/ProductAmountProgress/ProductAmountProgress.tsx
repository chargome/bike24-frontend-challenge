import React from 'react';

interface Props {
  current: number;
  max: number;
}

export const ProductAmountProgress = ({ current, max }: Props): JSX.Element => {
  const progressStyle: Record<string, string | number> = {
    '--value': Math.round((current / max) * 100),
  };

  return (
    <div className="radial-progress" style={progressStyle}>
      <div className="text-xs">{`${current} / ${max}`}</div>
    </div>
  );
};
