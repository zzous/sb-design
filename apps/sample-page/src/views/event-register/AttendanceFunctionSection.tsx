import React, { useRef, useState } from 'react';
import SectionTitle from './SectionTitle';

/* ── Types ── */
interface AccRow {
  id: number;
  checked: boolean;
  round: string;
  policy: string;
  baseFile: File | null;
  payFile: File | null;
}

const makeAccRow = (id: number): AccRow => ({
  id, checked: false, round: '', policy: '', baseFile: null, payFile: null,
});

/* ── File upload with guide text ── */
function FileUploadCell({
  id,
  file,
  onFile,
}: {
  id: string;
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const clear = () => { onFile(null); if (ref.current) ref.current.value = ''; };
  return (
    <>
      <div className="reg-group wp-100">
        <div className="reg-item">
          <div className="btn-file">
            <input ref={ref} type="file" id={id} hidden
              onChange={e => onFile(e.target.files?.[0] ?? null)} />
            <label className="btn-up" htmlFor={id}>파일첨부</label>
          </div>
          <span className="input-guide inline">용량 : 2MB 이하 | 형식 : jpg, gif, pdf</span>
        </div>
      </div>
      {file && (
        <div className="upload-file-box wp-100">
          <div className="upload-file-head flex space-between">
            <button type="button" className="btn del-all btn-secondary" onClick={clear}>
              <span className="offscreen">전체파일삭제</span>
            </button>
            <span className="name">파일명</span>
            <span className="volume">용량</span>
          </div>
          <div className="upload-file-list">
            <div className="upload-file-list-item flex space-between">
              <button type="button" className="btn del btn-secondary" onClick={clear}>
                <span className="offscreen">파일삭제</span>
              </button>
              <span className="name">{file.name}</span>
              <span className="volume">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Main Component ── */
export default function AttendanceFunctionSection() {
  const [attendDate,   setAttendDate]   = useState<'28' | '29' | '30' | '31'>('28');
  const [basePolicy,   setBasePolicy]   = useState('');
  const [attBenUsed,   setAttBenUsed]   = useState(false);
  const [attBenPolicy, setAttBenPolicy] = useState('');
  const [allAcc,       setAllAcc]       = useState(false);
  const [accRows,      setAccRows]      = useState<AccRow[]>([
    makeAccRow(1),
    makeAccRow(2),
  ]);

  const updateRow = (id: number, patch: Partial<AccRow>) =>
    setAccRows(p => p.map(r => r.id === id ? { ...r, ...patch } : r));

  const addRow = () =>
    setAccRows(p => [...p, makeAccRow(Date.now())]);

  const removeChecked = () =>
    setAccRows(p => p.filter(r => !r.checked));

  const toggleAll = (checked: boolean) => {
    setAllAcc(checked);
    setAccRows(p => p.map(r => ({ ...r, checked })));
  };

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

              {/* 날짜 */}
              <tr>
                <th scope="row">날짜<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td colSpan={3}>
                  <div className="reg-group">
                    <div className="reg-item">
                      {(['28', '29', '30', '31'] as const).map((v, i) => (
                        <span key={v} className="radio">
                          <input id={`dateRdo${i + 1}`} name="dateRdoGroup" type="radio"
                            checked={attendDate === v} onChange={() => setAttendDate(v)} />
                          <label htmlFor={`dateRdo${i + 1}`}>{v}</label>
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>

              {/* 기본 지급 포인트 / 개근 혜택 */}
              <tr>
                <th scope="row">기본 지급 포인트<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="reg-group inline">
                    <div className="reg-item">
                      <input type="text" className="form-control w-100" readOnly value={basePolicy}
                        onChange={e => setBasePolicy(e.target.value)} />
                      <button type="button" className="btn btn-slm">정책검색</button>
                    </div>
                  </div>
                </td>
                <th scope="row">개근 혜택<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="reg-group inline">
                    <div className="reg-item">
                      <span className="checkbox">
                        <input id="attChk1" name="attChk1Group" type="checkbox"
                          checked={attBenUsed} onChange={e => setAttBenUsed(e.target.checked)} />
                        <label htmlFor="attChk1">사용</label>
                      </span>
                    </div>
                    <div className="reg-item">
                      <input type="text" className="form-control w-100" readOnly value={attBenPolicy}
                        onChange={e => setAttBenPolicy(e.target.value)}
                        disabled={!attBenUsed} />
                      <button type="button" className="btn btn-slm" disabled={!attBenUsed}>정책검색</button>
                    </div>
                  </div>
                </td>
              </tr>

              {/* 누적 혜택 */}
              <tr>
                <th scope="row">누적 혜택</th>
                <td colSpan={3}>
                  <div className="table-util mt-20">
                    <div className="btn-set-m flex">
                      <button type="button" className="btn btn-ss" onClick={addRow}>추가</button>
                      <button type="button" className="btn btn-ss" onClick={removeChecked}>삭제</button>
                    </div>
                  </div>
                  <div className="tbl-wrap mt-10">
                    <table className="table reg" style={{ width: '100%' }}>
                      <caption>누적 혜택</caption>
                      <colgroup>
                        <col style={{ width: 45 }} />
                        <col style={{ width: 140 }} />
                        <col style={{ width: 220 }} />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" className="chk">
                            <span className="checkbox">
                              <input id="accChkAll" name="accChkGroup" type="checkbox"
                                checked={allAcc} onChange={e => toggleAll(e.target.checked)} />
                              <label htmlFor="accChkAll" />
                            </span>
                          </th>
                          <th scope="col">회차<span className="ess"><span className="offscreen">필수입력</span></span></th>
                          <th scope="col">지급 포인트<span className="ess"><span className="offscreen">필수입력</span></span></th>
                          <th scope="col">기본 이미지 (가로 0,000 * 세로 0,000 px)<span className="ess"><span className="offscreen">필수입력</span></span></th>
                          <th scope="col">지급 이미지 (가로 0,000 * 세로 0,000 px)<span className="ess"><span className="offscreen">필수입력</span></span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {accRows.map(row => (
                          <tr key={row.id}>
                            <td>
                              <span className="checkbox">
                                <input id={`accChk${row.id}`} name="accChkGroup" type="checkbox"
                                  checked={row.checked} onChange={e => updateRow(row.id, { checked: e.target.checked })} />
                                <label htmlFor={`accChk${row.id}`} />
                              </span>
                            </td>
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <select className="custom-select" value={row.round}
                                    onChange={e => updateRow(row.id, { round: e.target.value })}>
                                    <option value="">select</option>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(n => (
                                      <option key={n} value={String(n)}>{n}일차</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <input type="text" className="form-control w-100" readOnly value={row.policy}
                                    onChange={e => updateRow(row.id, { policy: e.target.value })} />
                                  <button type="button" className="btn btn-slm">정책검색</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <FileUploadCell
                                id={`baseFile${row.id}`}
                                file={row.baseFile}
                                onFile={f => updateRow(row.id, { baseFile: f })}
                              />
                            </td>
                            <td>
                              <FileUploadCell
                                id={`payFile${row.id}`}
                                file={row.payFile}
                                onFile={f => updateRow(row.id, { payFile: f })}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
