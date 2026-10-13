export default function PillButton({
  href,
  children,
  variant = 'red',
  type = 'button',
  className = '',
  onClick,
  ...rest
}) {
  const classes = `pill-btn pill-btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        <span>{children}</span>
        <span className="pill-btn__arrow" aria-hidden="true">
          →
        </span>
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      <span>{children}</span>
      <span className="pill-btn__arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
}
