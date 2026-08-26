type FormFieldProps = {
  label: string;
  hint?: string;
  children: React.ReactNode;
};

export function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <div>
      <label className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
        {label}
      </label>
      {hint ? (
        <p className="text-text-secondary/70 mt-0.5 text-[11px]">{hint}</p>
      ) : null}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border-line bg-void text-text-primary focus:border-accent/50 w-full rounded-xl border px-3.5 py-2.5 text-[13.5px] transition-colors outline-none ${className ?? ""}`}
    />
  );
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`border-line bg-void text-text-primary focus:border-accent/50 w-full resize-none rounded-xl border px-3.5 py-2.5 text-[13.5px] transition-colors outline-none ${className ?? ""}`}
    />
  );
}
