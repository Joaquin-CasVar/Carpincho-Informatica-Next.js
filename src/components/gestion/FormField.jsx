
export default function FormField({
    id,
    name,
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder = '',
    inputMode,
    disabled = false,
}) {
    const inputId = id || name;

    return (
        <div>
        <label htmlFor={inputId} className="label">
            {label}
        </label>

        <input
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            inputMode={inputMode}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className="input"
        />

        {error && (
            <p
            id={`${inputId}-error`}
            role="alert"
            className="field-error"
            >
            {error}
            </p>
        )}
        </div>
    );
}
