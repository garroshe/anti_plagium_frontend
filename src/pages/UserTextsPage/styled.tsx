import styled from "styled-components";

export const PageWrapper = styled.section`
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    margin: 1.5rem auto;
    padding: 0 0.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    margin: 1rem auto;
    gap: 1rem;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    button {
      width: 100%;
    }
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;

  @media (max-width: 640px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const TextList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 640px) {
    gap: 0.75rem;
  }
`;

export const TextCard = styled.article`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);

  @media (max-width: 480px) {
    padding: 0.85rem 1rem;
  }
`;

export const TextPreview = styled.p`
  margin: 0 0 0.5rem;
  color: #1f2937;
  line-height: 1.5;
  white-space: pre-wrap;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #6b7280;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

export const CardActions = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 480px) {
    width: 100%;

    button {
      flex: 1 1 100%;
    }
  }
`;

