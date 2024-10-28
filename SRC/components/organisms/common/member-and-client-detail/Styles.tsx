import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 22px 22px;
  .top-block {
    display: flex;
  }
  .ant-avatar {
    border-radius: 30px;
  }
  .timestamp {
    font-family: ${({ theme }) => theme.text.font.heading};
    line-height: 14px;
    color: ${({ theme }) => theme.colors.text.t5};
    span {
      color: ${({ theme }) => theme.colors.text.t7};
    }
  }

  .overlay {
    top: -1px;
    left: -1px;
    position: absolute;
    height: 100vh;
    background: white;
    opacity: 0.7;
    z-index: 1;
    width: 100%;
  }

  &.skeleton-wrapper {
    .ant-skeleton {
      .ant-skeleton-avatar {
        border-radius: 30px;
      }
      .ant-skeleton-title {
        margin: 24px auto 0;
        height: 21px;
      }
      .ant-skeleton-title + .ant-skeleton-paragraph {
        margin: 8px 0 24px;
        li {
          margin: 0 auto;
        }
      }
      .ant-skeleton-button {
        width: 40px;
        min-width: 40px;
        height: 40px;
        border-radius: 15px;
      }
    }
  }
`;

export const Actions = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 16px;
  .btn {
    background: #ece6f2;
    border: none;
    border-radius: 15px;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
      background: #d7cce4;
    }
    &.ant-btn-icon-only {
      padding: 10px;
    }
    &.ant-btn[disabled] {
      background: #f3f2f4;
      svg {
        color: #9e99ab;
      }
    }
    svg {
      height: 20px;
      width: 20px;
      color: #390179;
      margin: 0;
    }
  }
  .ant-btn.feature-unavailable {
    cursor: auto;
    background: ${({ theme }) => theme.colors.text.t0};
    svg {
      color: ${({ theme }) => theme.colors.text.t3};
    }
  }
  .ant-btn-dangerous {
    background: #fdf4f4 !important;
    color: #db312b;
  }
`;
