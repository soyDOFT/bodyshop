import {
  LuMenu,
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuChevronDown,
  LuPlus,
  LuMinus,
  LuPhone,
  LuMail,
  LuMapPin,
  LuClock,
  LuArrowRight,
  LuCheck,
} from 'react-icons/lu';
import {
  SiFacebook,
  SiYelp,
  SiGoogle,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export type IconName =
  | 'menu'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'plus'
  | 'minus'
  | 'phone'
  | 'mail'
  | 'map-pin'
  | 'clock'
  | 'arrow-right'
  | 'check'
  | 'facebook'
  | 'yelp'
  | 'google';

const ICONS: Record<IconName, IconType> = {
  menu: LuMenu,
  close: LuX,
  'chevron-left': LuChevronLeft,
  'chevron-right': LuChevronRight,
  'chevron-down': LuChevronDown,
  plus: LuPlus,
  minus: LuMinus,
  phone: LuPhone,
  mail: LuMail,
  'map-pin': LuMapPin,
  clock: LuClock,
  'arrow-right': LuArrowRight,
  check: LuCheck,
  facebook: SiFacebook,
  yelp: SiYelp,
  google: SiGoogle,
};

type IconProps = {
  name: IconName;
  size?: number | string;
  className?: string;
  title?: string;
};

export function Icon({ name, size = 20, className, title }: IconProps) {
  const Component = ICONS[name];
  return (
    <Component
      size={size}
      className={className}
      aria-hidden={!title || undefined}
      role={title ? 'img' : undefined}
      aria-label={title}
      focusable="false"
    />
  );
}
