import * as liaIcons from 'react-icons/lia';
import type { IconBaseProps } from 'react-icons';

type IconNames = keyof typeof liaIcons;

type IconProps = {
  iconName: IconNames;
  className: string;
} & IconBaseProps;

export default function Icon({ iconName, ...rest }: IconProps) {
  const IconName = liaIcons[iconName];
  return <IconName {...rest} />;
}
