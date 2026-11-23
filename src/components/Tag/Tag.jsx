import { StyledTag, TagDot } from './styles.js';

export default function Tag({ children, color, soft, border, dot = true }) {
  return (
    <StyledTag $color={color} $soft={soft} $border={border}>
      {dot && <TagDot $color={color} aria-hidden="true" />}
      {children}
    </StyledTag>
  );
}
