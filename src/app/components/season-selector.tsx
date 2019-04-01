import * as React from 'react';
import injectSheet from 'react-jss';

import Field from '../modules/forms/field';

import { ISheet } from '../../models';
import { ISeason, ISeasonWithSummary } from '../../models/seasons';
import { IFieldOutput } from '../modules/forms/form.models';

const sheet: ISheet = {
  wrapper: {},
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  onChange: (output: IFieldOutput) => void;
  seasons: Array<ISeason | ISeasonWithSummary>;
}

const UnstyledSeasonSelector = ({ classes, className, onChange, seasons }: IOwnProps) => {
  const options = seasons
    .map(season => ({
      id: season.id,
      label: season.label,
      value: season.id,
    }))
    .reverse();

  return (
    <Field
      options={{
        className,
        defaultValue: options[0] ? [options[0].id] : undefined,
        id: 'header-season-selector',
        onChange,
        options,
        type: 'dropdown',
      }}
    />
  );
};

const SeasonSelector = injectSheet(sheet)(UnstyledSeasonSelector);

export default SeasonSelector;
