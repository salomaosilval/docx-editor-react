import styled from "styled-components";

export const ImageContainer = styled.div`
  position: relative;
  margin: 8px 0;
  display: inline-block;
  max-width: 100%;
`;

export const ResizableImage = styled.img<{ isResizing?: boolean }>`
  display: block;
  max-width: 100%;
  height: auto;
  cursor: ${({ isResizing }) => (isResizing ? "se-resize" : "default")};
  border: 2px solid transparent;
  transition: border-color 0.2s;
  user-select: none;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  ${({ isResizing, theme }) =>
    isResizing &&
    `
    border: 2px dashed ${theme.colors.primary};
  `}
`;

export const ResizeHandle = styled.div`
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: se-resize;
  border-radius: 50%;
  z-index: 1;
`;
