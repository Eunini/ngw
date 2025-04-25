export function Button({ children, onClick, variant = 'default', className = '', ...props }) {
    const base = 'px-4 py-2 rounded font-medium';
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    };
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }