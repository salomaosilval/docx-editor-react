import styled from "styled-components";

export const ToolbarContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`};
`;

export const ToolbarButton = styled.button<{ active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, active }) => (active ? theme.colors.primary : "transparent")};
  color: ${({ theme, active }) => (active ? theme.colors.surface : theme.colors.text)};
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

export const StyledSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: transparent;
  cursor: pointer;
  min-width: 200px;
  height: 35px;

  optgroup {
    font-weight: bold;
    padding: 8px 0;
  }

  option {
    padding: 8px;
    font-weight: normal;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
