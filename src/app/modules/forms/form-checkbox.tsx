import * as React from 'react';
import classnames from 'classnames';
import { FieldProps } from './field';

interface Options extends FieldProps {}

interface OwnProps {
  options: Options;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

class Checkbox extends React.Component<OwnProps> {
  static displayName = 'Checkbox';

  render() {
    const { options, onClick, onChange, onFocus } = this.props;

    return (
      <label className={classnames('Checkbox', options.className)}>
        <input
          id={options.id}
          name={options.id}
          className="Checkbox-field"
          type="checkbox"
          required={options.isRequired}
          disabled={options.isDisabled}
          defaultChecked={options.isChecked}
          onClick={onClick}
          onChange={onChange}
          onFocus={onFocus}
        />

        <span className="Checkbox-label">
          <div className={classnames('Checkbox-switch', { 'is-on': options.isChecked })} />
          {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
          {options.label}
        </span>
      </label>
    );
  }
}

export default Checkbox;
