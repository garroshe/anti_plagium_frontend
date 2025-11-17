import { useEffect, useRef, useState } from "react";
import { ChevronDown, Heart, History, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useModal } from "../../../../context/modal-context.tsx";
import { useUser } from "../../../../context/user-context.tsx";
import {
  Avatar,
  Dropdown,
  DropdownHeader,
  DropdownWrapper,
  MenuItem,
  MenuSection,
  ProfileButton,
  UserEmail,
  UserInfo,
  UserName,
} from "./styled";

interface MenuItemType {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  action: () => void;
  danger?: boolean;
}

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useUser();
  const { openModal } = useModal();
  const navigate = useNavigate();

  const menuItems: MenuItemType[] = [
    {
      icon: History,
      label: "Історія перевірок",
      action: () => navigate("/history"),
    },
    {
      icon: Heart,
      label: "Обране",
      action: () => navigate("/favorites"),
    },
    { icon: Settings, label: "Налаштування", action: () => openModal({ modalName: "profileSettings" }) },
    { icon: LogOut, danger: true, label: "Вийти", action: () => logout() },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <ProfileButton onClick={() => setIsOpen(!isOpen)}>
        <Avatar
          src={user?.avatar || "https://www.meme-arsenal.com/memes/4cdee02fbf6649b4e2c7b597f9d4d143.jpg"}
          alt={user?.loginName}
        />
        <UserInfo>
          <UserName>{user?.loginName}</UserName>
          <UserEmail>{user?.email}</UserEmail>
        </UserInfo>
        <ChevronDown
          size={16}
          style={{
            color: "#4b5563",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </ProfileButton>

      {isOpen && (
        <Dropdown>
          <DropdownHeader>
            <UserName>{user?.loginName}</UserName>
            <UserEmail>{user?.email}</UserEmail>
          </DropdownHeader>

          <MenuSection>
            {menuItems.map((item, i) => (
              <MenuItem
                key={i}
                $danger={item.danger}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
              >
                <item.icon size={16} />
                {item.label}
              </MenuItem>
            ))}
          </MenuSection>
        </Dropdown>
      )}
    </DropdownWrapper>
  );
};

export default UserProfileDropdown;
