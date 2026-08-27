import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export const socialIconMap = {
  Facebook: FaFacebook,
  Youtube: FaYoutube,
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  X: FaXTwitter,
} satisfies Record<string, IconType>;

export type SocialIconName = keyof typeof socialIconMap;
export const socialIconOptions = Object.keys(socialIconMap) as SocialIconName[];

export function getSocialIcon(name: string): IconType {
  return socialIconMap[name as SocialIconName] ?? FaFacebook;
}
