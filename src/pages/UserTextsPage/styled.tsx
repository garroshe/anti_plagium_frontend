import styled from "styled-components";

export const PageWrapper = styled.section`
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
`;

export const TextList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TextCard = styled.article`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
`;

export const TextPreview = styled.p`
  margin: 0 0 0.5rem;
  color: #1f2937;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
`;

export const CardActions = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

