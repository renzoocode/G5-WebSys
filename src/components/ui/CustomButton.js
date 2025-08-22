export default function CustomButton({ type = "primary", label, onClick, className = "" }) {
  const baseClasses =
    "relative inline-flex items-center justify-center text-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-none";

  const typeClasses =
    type === "primary"
      ? "bg-green-500 text-white hover:bg-green-600 focus-visible:outline-green-600 dark:bg-green-600 dark:hover:bg-green-500 dark:focus-visible:outline-green-400"
      : "bg-red-500 text-white hover:bg-red-600 focus-visible:outline-red-600 dark:bg-red-600 dark:hover:bg-red-500 dark:focus-visible:outline-red-400";

  const finalClasses = `${baseClasses} ${className ? className : typeClasses}`;

  return (
    <button
      type="button"
      className={finalClasses}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
