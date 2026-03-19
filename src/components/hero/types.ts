import { ButtonProps } from "../button/types";

export type HeroProps = {
  title: string;
  subtitle?: string;
  image?: string;
  buttons: ButtonProps[];
};
