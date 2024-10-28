import styled from 'styled-components';

export const UploadArea = styled.div`
  .ant-upload.ant-upload-drag {
    background: #fafcff;
    border: 1px dashed #9e99ab;
    border-radius: 15px;
    .ant-upload-btn {
      min-height: 178px;
      display: flex;
      height: 100%;
      justify-content: center;
    }
    .ant-upload-drag-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      h3 {
        font-family: Heebo;
        font-style: normal;
        font-weight: 500;
        text-align: center;
        font-size: 14px;
        line-height: 150%;
        color: #3d3358;
        margin-top: 4px;
      }
      span {
        font-size: 12px;
        line-height: 150%;
        color: #857f96;
      }

      .ant-progress {
        max-width: 240px;
        line-height: 0;
        margin-top: 10px;
        &-inner {
          background: #e7e6eb;
        }
        &-bg {
          height: 4px !important;
          border-radius: 2px 0px 0px 2px;
          background-color: ${({ theme }) => theme.colors.info.default};
        }
      }
    }
  }

  &.audio-upload {
    .ant-upload.ant-upload-drag {
      border: 1px dashed #b7b3c1;
      border-radius: 8px;
      .ant-upload-btn {
        min-height: 158px;
      }
    }
    &.drop-voicemail {
      .ant-upload.ant-upload-drag .ant-upload-btn {
        min-height: 178px;
      }
    }
  }
  &.upload-area--voicemail .ant-upload.ant-upload-drag {
    height: fit-content;
    padding: 8px 24px;
  }
  &.upload-area--excel {
    width: 400px;
    height: 300px;
    .ant-upload.ant-upload-drag {
      padding: 8px 24px;
    }
  }
`;

export const IconContainer = styled.div`
  width: 118px;
  height: 118px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.p1};
  &.icon-container--voicemail {
    width: 98px;
    height: 98px;
  }
  svg.excel-icon {
    font-size: 48px;
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;
export const UploadInstruction = styled.div`
  max-width: 285px;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #857f96;
  margin-top: 10px;
  &.instruction--voicemail {
    width: 256px;
    margin-top: 7px !important;
  }
  &.drop-voicemail {
    max-width: 208px;
  }
`;

export const NotFoundWrapper = styled.div<any>`
  position: absolute;
  background: ${({ theme }) => theme.colors.white};
  padding: ${props => props.padding || '0px 16px 6px 15px'};
  z-index: 1;
  width: 100%;
  height: calc(100vh - ${props => props.cutheight}px);
  overflow: hidden scroll;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &.universal-search-not-found {
    padding: 180px 0 0 0;
    background-color: ${({ theme }) => theme.colors.primary.p0};
  }
`;

export const NoResultsFound = styled.div`
  text-align: center;
  h3 {
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
    font-size: ${({ theme }) => theme.text.size.body.text.secondary};
    line-height: 16px;
    color: ${({ theme }) => theme.colors.text.t6};
    margin-top: 20px;
    margin-bottom: 6px;
  }
  p {
    max-width: 209px;
    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.body.text.caption};
    line-height: 18px;
    color: ${({ theme }) => theme.colors.text.t5};
    margin: 0 auto;
  }
  &.contact-search {
    margin-top: 41px;
  }
`;
export const NumberBadgeWrapper = styled.span`
  .ant-badge-count {
    background: #fe4646;
    border-radius: 8px;
    height: 20px;
    padding: 0 6px;
  }
  span {
    font-family: 'Manrope', sans-serif;
    font-weight: bold;
    font-size: 11px;
    line-height: 12px;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
  &.logs-badge {
    .ant-badge {
      position: absolute;
      top: 5px;
      margin-left: 3px;
      &-count {
        padding: 0 4px;
      }
    }
  }
  &.numbers-batch {
    position: relative;
    .ant-badge {
      position: absolute;
      top: -25px;
      &-count {
        padding: 0 4px;
      }
    }
  }
`;
