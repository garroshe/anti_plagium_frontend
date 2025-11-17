import styled from "styled-components";

export const StyledProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AvatarPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #d9d9d9;
  }
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const FeedbackText = styled.p<{ $type: "success" | "error" }>`
  font-size: 13px;
  color: ${({ $type }) => ($type === "success" ? "#16a34a" : "#dc2626")};
  margin: 0;
`;

