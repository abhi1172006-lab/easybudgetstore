export default function PlaceholderImage({ className = '', label = 'EasyBudgetStore' }) {
  return (
    <div className={`flex items-center justify-center bg-brand-surface text-brand-muted ${className}`}>
      <span className="text-[10px] uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );
}

export function SafeImage({ src, alt, className = '', ...props }) {
  const fallback =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect fill="#F7F7F5" width="100%" height="100%"/><text x="50%" y="50%" text-anchor="middle" fill="#888" font-family="Arial" font-size="22">${alt || 'EasyBudgetStore'}</text></svg>`
    );
  return (
    <img
      src={src || fallback}
      alt={alt || ''}
      className={className}
      loading="lazy"
      onError={(e) => {
        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
      }}
      {...props}
    />
  );
}
