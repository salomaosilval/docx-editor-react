import styled from "styled-components";

export const FileActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BaseButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 160px;
  height: 40px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FileButton = styled(BaseButton)``;

export const FileLabel = styled(BaseButton).attrs({ as: "label" })`
  background: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const FileInput = styled.input`
  display: none;
`;
