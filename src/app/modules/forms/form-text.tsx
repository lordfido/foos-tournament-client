import * as React from 'react';
import classnames from 'classnames';
import { FieldProps } from './field';

interface Options extends FieldProps {
  minLength?: number;
  maxLength?: number;
}

interface OwnProps {
  options: Options;
  onClick: (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

class Text extends React.Component<OwnProps> {
  static displayName = 'Text';

  render() {
    const { options, onClick, onChange, onFocus } = this.props;

    return (
      <label className={classnames('Text', { 'is-submitted': options.isSubmitted || options.error })}>
        <span className="Text-label">
          {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
          <span>{options.label}</span>
        </span>

        {options.type !== 'textarea' && (
          <input
            id={options.id}
            name={options.id}
            type={options.type}
            className={classnames('Text-field', options.className, { 'has-errors': options.error })}
            placeholder={options.placeholder}
            disabled={options.isDisabled && (typeof options.isDiactivatable === 'undefined' || options.isDiactivatable)}
            required={options.isRequired}
            defaultValue={options.model || ''}
            onClick={onClick}
            onChange={onChange}
            onFocus={onFocus}
          />
        )}

        {options.type === 'textarea' && (
          <TextArea
            id={options.id}
            name={options.id}
            className={classnames('Text-field', 'is-area', options.className, { 'has-errors': options.error })}
            placeholder={options.placeholder}
            disabled={options.isDisabled && (typeof options.isDiactivatable === 'undefined' || options.isDiactivatable)}
            required={options.isRequired}
            defaultValue={options.model || ''}
            onClick={onClick}
            onChange={onChange}
            onFocus={onFocus}
          />
        )}

        {options.error && <span className="Text-error">{options.error}</span>}
      </label>
    );
  }
}

export default Text;
