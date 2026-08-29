type PartnerLogoProps = {
  name: string;
  logoSrc?: string;
};

export function PartnerLogo({ name, logoSrc }: PartnerLogoProps) {
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={name}
        className="h-7 w-auto object-contain grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
      />
    );
  }

  return (
    <span className="text-text-secondary hover:text-accent-2 text-lg font-semibold transition-colors duration-300">
      {name}
    </span>
  );
}
