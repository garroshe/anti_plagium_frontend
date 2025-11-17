import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DropdownWrapper = styled.div`
  position: relative;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s;
  outline: none;

  &:hover {
    background-color: #f3f4f6;
  }

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #6366f1;
`;

export const UserInfo = styled.div`
  display: block;
  text-align: left;
`;

export const UserName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const UserEmail = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
`;

export const Dropdown = styled.div`
  position: absolute;
  right: 0;
  margin-top: 8px;
  width: 256px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  padding: 8px 0;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-in-out;

  @media (max-width: 640px) {
    position: static;
    width: 100%;
    max-width: unset;
  }

  @media (max-width: 480px) {
    width: 100%;
    left: 0;
  }
`;

export const DropdownHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
`;

export const MenuSection = styled.div`
  padding: 8px 0;
`;

export const MenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  font-size: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: ${({ $danger }) => ($danger ? "#dc2626" : "#374151")};
  font-weight: 500;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ $danger }) => ($danger ? "#fef2f2" : "#f3f4f6")};
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;
