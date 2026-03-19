export type OptionCardProps = {
  label: string;
  value: string;
  image?: string;
  selected?: boolean;
  onClick: (value: string) => void;
};
