export type HeroProps = {
  title: string;
  subtitle?: string;
  image?: string;
  buttons: { label: string; onClick: () => void }[];
};
