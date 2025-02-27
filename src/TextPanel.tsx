import React, { useState } from 'react';
import { PanelProps, GrafanaTheme, SelectableValue } from '@grafana/data';
import { Select, stylesFactory, useTheme } from '@grafana/ui';
import { TextOptions } from 'types';

import { Text } from './Text';

import { css, cx } from 'emotion';

interface Props extends PanelProps<TextOptions> {}

export const TextPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [frameIndex, setFrameIndex] = useState(0);

  const theme = useTheme();
  const styles = getStyles(theme);

  const onChangeFrame = (selectableValue: SelectableValue<string>) => {
    const index = data.series.findIndex((frame) => frame.refId === selectableValue.value);
    setFrameIndex(index);
  };

  const selectableFrames = data.series.map((frame) => ({
    label: frame.name,
    value: frame.refId,
  }));

  const frame = data.series[frameIndex];

  return (
    <div
      className={cx(
        styles.root,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Text frame={frame} content={options.content ?? ''} defaultContent={options.defaultContent ?? ''} />

      {data.series.length > 1 && (
        <div className={styles.frameSelect}>
          <Select onChange={onChangeFrame} value={frame.refId} options={selectableFrames} />
        </div>
      )}
    </div>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  root: css`
    display: flex;
    flex-direction: column;
  `,
  frameSelect: css`
    padding: ${theme.spacing.sm};
  `,
}));
