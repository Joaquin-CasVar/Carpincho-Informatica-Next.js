
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
        <label htmlFor={inputId} className="mb-1 block">
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
            className="w-full rounded border p-2 disabled:opacity-50"
        />

        {error && (
            <p
            id={`${inputId}-error`}
            role="alert"
            className="mt-1 text-sm text-red-500"
            >
            {error}
            </p>
        )}
        </div>
    );
}
