export default function AnimatedButton({ children, className = '', href, onClick, variant = 'primary', ...rest }) {
  const cls = variant === 'outline' ? `btn-outline ${className}` : `btn-primary ${className}`;

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
