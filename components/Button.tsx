import { ArrowRight } from "./Icons";

type Common = { label: React.ReactNode; variant?: "primary" | "ghost"; size?: "md" | "sm"; icon?: React.ReactNode; className?: string };

const cls = ({ variant = "primary", size = "md", className = "" }: Common) =>
  `btn${variant === "ghost" ? " btn--ghost" : ""}${size === "sm" ? " btn--sm" : ""} ${className}`.trim();

const Inner = ({ label, icon }: Common) => (
  <>
    <span className="btn__label">{label}</span>
    <span className="btn__icon" aria-hidden="true">{icon ?? <ArrowRight />}</span>
  </>
);

/** Pill label with a companion circle, as a link. */
export function ButtonLink(props: Common & { href: string; target?: string; rel?: string }) {
  const { href, target, rel } = props;
  return (
    <a className={cls(props)} href={href} target={target} rel={rel}>
      <Inner {...props} />
    </a>
  );
}

/** Pill label with a companion circle, as a button. */
export function Button(props: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { label, variant, size, icon, className, ...rest } = props;
  return (
    <button className={cls({ label, variant, size, className })} {...rest}>
      <Inner label={label} icon={icon} />
    </button>
  );
}
