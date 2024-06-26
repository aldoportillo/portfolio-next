import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const NavLink = ({ link }) => {
  const pathName = usePathname();

  return (
    <StyledLink href={link.url} isActive={pathName === link.url}>
      <span>{link.title}</span>
      <Image src={link.icon} alt={`${link.title} icon`} />
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row-reverse;
  gap: 5px;
  align-items: center;
  border: 1px solid #2c2c2c;
  padding: 0.5em 0.75em;
  border-radius: 10px;
  color: #fff;
  background-color: transparent;
  transition: background-color 0.4s, color 0.4s;

  &:hover {
    background-color: #5eddac;
    color: #242424;
  }
  &:active {
    background-color: #5eddac;
    color: #242424;
  }

  img {
    height: 20px;
    min-height: 20px;
    min-width: 20px;
    width: 20px;
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #5eddac;
    color: #242424;
  `}
`;

export default NavLink;