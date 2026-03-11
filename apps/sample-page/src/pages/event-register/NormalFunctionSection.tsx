import React from 'react';
import SectionTitle from './SectionTitle';

interface Props {
  btnEvent:      string;
  setBtnEvent:   (v: string) => void;
  btnName:       string;
  setBtnName:    (v: string) => void;
  externalLink:  string;
  setExternalLink: (v: string) => void;
}

export default function NormalFunctionSection({
  btnEvent, setBtnEvent,
  btnName,  setBtnName,
  externalLink, setExternalLink,
}: Props) {
  return (
    <div className="ui-section">
      <SectionTitle title="기능 설정" showEss />
      <div className="ui-content">
        <div className="tbl-wrap mt-10">
          <table className="table reg" style={{ width: '100%' }}>
            <colgroup>
              <col style={{ width: 160 }} />
              <col />
              <col style={{ width: 160 }} />
              <col />
            </colgroup>
            <tbody>
              {/* 버튼 이벤트 / 버튼 명 */}
              <tr>
                <th scope="row">버튼 이벤트<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="reg-group inline">
                    <div className="reg-item">
                      <select className="custom-select" value={btnEvent} onChange={e => setBtnEvent(e.target.value)}>
                        <option value="">Select</option>
                        <option value="link">외부 링크</option>
                        <option value="none">없음</option>
                      </select>
                    </div>
                  </div>
                </td>
                <th scope="row">버튼 명<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="reg-group inline">
                    <div className="reg-item">
                      <input
                        type="text"
                        className="form-control w-200"
                        value={btnName}
                        onChange={e => setBtnName(e.target.value.slice(0, 10))}
                        placeholder="예: 참여하기"
                      />
                      <span className="unit">{btnName.length}/10</span>
                    </div>
                  </div>
                  <span className="input-guide">App에서 버튼에 표기할 버튼 명을 입력하십시오. (예: 참여하기)</span>
                </td>
              </tr>

              {/* 외부 링크 */}
              <tr>
                <th scope="row">외부 링크<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td colSpan={3}>
                  <div className="reg-group wp-100">
                    <div className="reg-item">
                      <input
                        type="text"
                        className="form-control"
                        value={externalLink}
                        onChange={e => setExternalLink(e.target.value)}
                        placeholder="http 또는 https 를 포함한 URL을 입력하십시오"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
