import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 40px 24px 26px;
  }
  &.delete-modal {
    h5 {
      margin-bottom: 8px;
    }
    .ant-btn-primary {
      background: ${({ theme }) => theme.colors.danger.default} !important;
      border-color: ${({ theme }) => theme.colors.danger.default} !important;
      color: ${({ theme }) => theme.colors.white} !important;
      &.btn--disabled,
      &:disabled {
        background: ${({ theme }) => theme.colors.text.t2} !important;
        border-color: ${({ theme }) => theme.colors.text.t2} !important;
      }
    }
  }
  &.has-head-img {
    max-width: 408px;
    .avatar {
      margin: 0 auto 8px;
      width: 40px;
      height: 40px;
      svg {
        font-size: 20px;
        position: relative;
        top: 2px;
      }
    }
    .capitalize {
      text-transform: none;
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
  .title {
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.heading.h5};
    line-height: 24px;
    color: ${({ theme }) => theme.colors.text.t9};
  }
  .info {
    margin: 0px;
    margin-top: 6px;
    font-weight: 500;
    font-size: ${({ theme }) => theme.text.size.body.text.small};
    line-height: 20px;
    color: ${({ theme }) => theme.colors.text.t6};
  }
  .btn--cancel {
    color: ${({ theme }) => theme.colors.text.t5};
    margin-right: 8px;
  }
  .ant-btn-primary {
    min-width: 164px;
  }
  .ant-btn-link {
    min-width: 120px;
  }
  /* actions secondary modal */
  .body-content {
    margin-top: 24px;
    .ant-input {
      margin-top: 0px;
    }
  }
  &.code-verification-modal {
    p {
      width: 300px;
      margin: 0 auto;
    }
    .info {
      font-family: ${({ theme }) => theme.text.font.heading};
      font-weight: ${({ theme }) => theme.text.weight.regular};
    }
    .ant-btn-primary {
      background-color: ${({ theme }) => theme.colors.success.default};
      border: none;
    }
  }
`;
