import styled from "styled-components";
type Props = {
  bgColor: string;
  color: string;
  hoverBgColor?: string;
  hoverColor?: string;
};

export const RoundedButton = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background: ${({ bgColor }: Props) => bgColor};
  color: ${({ color }: Props) => color};
  border: none;
  &:hover {
    background: ${({ hoverBgColor }: Props) => hoverBgColor};
    color: ${({ hoverColor }: Props) => hoverColor};
  }
`;
