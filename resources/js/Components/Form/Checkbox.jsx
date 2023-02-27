export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 shadow-sm focus:ring-neutral-500 dark:focus:ring-neutral-600 dark:focus:ring-offset-neutral-800"
            onChange={(e) => handleChange(e)}
        />
    );
}
