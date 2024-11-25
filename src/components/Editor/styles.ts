import styled from "styled-components";

export const EditorContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const EditorContent = styled.div`
  min-height: 300px;
  padding: ${({ theme }) => theme.spacing.md};

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

export const EditorWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
