import * as React from 'react';
import classnames from 'classnames';
import { FieldProps } from './field';

interface Options extends FieldProps {
  isChecked?: boolean;
}

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

    // TODO: Add a React date-picker
    return (
      <div className="Date">
        <label htmlFor={options.id} className="Date-label">
          {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
          <span>{options.label}</span>
        </label>

        <input
          type="date"
          id={options.id}
          name={options.id}
          className={classnames('Date-field', options.className, { 'has-errors': options.error })}
          placeholder={options.placeholder}
          disabled={options.isDisabled}
          required={options.isRequired}
          defaultValue={options.model || ''}
          onClick={onClick}
          onChange={onChange}
          onFocus={onFocus}
        />

        {options.error && <span className="Date-error">{options.error}</span>}
      </div>
    );
  }
}

export default Checkbox;
