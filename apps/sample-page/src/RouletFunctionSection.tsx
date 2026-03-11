import React, { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';

/* ── Types ── */
interface PieRow {
  id: number;
  isPrize: 'win' | 'lose';
  text: string;
  rewardPolicy: string;
  product: string;
  taxTarget: boolean;
  limitUsed: boolean;
  limitCount: string;
  probInt: string;
  probDec: string;
}

type PieCount = 4 | 5 | 6;

const makePieRow = (id: number): PieRow => ({
  id,
  isPrize: 'lose',
  text: '',
  rewardPolicy: '',
  product: '',
  taxTarget: false,
  limitUsed: false,
  limitCount: '',
  probInt: '',
  probDec: '',
});

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + '시');
const MINS  = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0') + '분');

export default function RouletFunctionSection() {
  const [dirBenType, setDirBenType] = useState<'리워드 포인트' | 'B2B몰 상품'>('리워드 포인트');
  const [afBenType,  setAfBenType]  = useState<'외부 소싱 상품' | 'B2B몰 상품'>('외부 소싱 상품');
  const [afBenDate,  setAfBenDate]  = useState('');
  const [afBenHour,  setAfBenHour]  = useState('00시');
  const [afBenMin,   setAfBenMin]   = useState('00분');
  const [pieCount,   setPieCount]   = useState<PieCount>(6);
  const [pieRows,    setPieRows]    = useState<PieRow[]>(() =>
    Array.from({ length: 6 }, (_, i) => makePieRow(i + 1))
  );

  /* 파이 개수 변경 시 행 동적 조절 */
  useEffect(() => {
    setPieRows(prev => {
      if (prev.length === pieCount) return prev;
      if (prev.length < pieCount) {
        const extra = Array.from({ length: pieCount - prev.length }, (_, i) =>
          makePieRow(prev.length + i + 1)
        );
        return [...prev, ...extra];
      }
      return prev.slice(0, pieCount);
    });
  }, [pieCount]);

  const updateRow = (id: number, patch: Partial<PieRow>) =>
    setPieRows(p => p.map(r => r.id === id ? { ...r, ...patch } : r));

  return (
    <div className="ui-section">
      <SectionTitle title="기능 설정" showEss />
      <div className="ui-content">
        <div className="tbl-wrap mt-10">
          <table className="table reg" style={{ width: '100%' }}>
            <colgroup>
              <col style={{ width: 160 }} />
              <col />
            </colgroup>
            <tbody>

              {/* 즉시 지급 혜택 */}
              <tr>
                <th scope="row">즉시 지급 혜택<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="reg-group">
                    <div className="reg-item">
                      {(['리워드 포인트', 'B2B몰 상품'] as const).map((v, i) => (
                        <span key={v} className="radio">
                          <input id={`dirBenRdo${i + 1}`} name="dirBenRdoGroup" type="radio"
                            checked={dirBenType === v} onChange={() => setDirBenType(v)} />
                          <label htmlFor={`dirBenRdo${i + 1}`}>{v}</label>
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>

              {/* 당첨 후 지급 혜택 */}
              <tr>
                <th scope="row">당첨 후 지급 혜택<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="reg-group inline">
                    <div className="reg-item">
                      {(['외부 소싱 상품', 'B2B몰 상품'] as const).map((v, i) => (
                        <span key={v} className="radio">
                          <input id={`afBenRdo${i + 1}`} name="afBenRdoGroup" type="radio"
                            checked={afBenType === v} onChange={() => setAfBenType(v)} />
                          <label htmlFor={`afBenRdo${i + 1}`}>{v}</label>
                        </span>
                      ))}
                    </div>
                    <div className="reg-item">
                      <div className="ui-datepicker-range">
                        <input type="date" className="form-control" style={{ width: 140 }}
                          value={afBenDate} onChange={e => setAfBenDate(e.target.value)} />
                      </div>
                      <select className="custom-select time" value={afBenHour} onChange={e => setAfBenHour(e.target.value)}>
                        {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                      <select className="custom-select time" value={afBenMin} onChange={e => setAfBenMin(e.target.value)}>
                        {MINS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                </td>
              </tr>

              {/* 파이 개수 */}
              <tr>
                <th scope="row">파이 개수<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="reg-group inline">
                    <div className="reg-item">
                      {([4, 5, 6] as PieCount[]).map((v, i) => (
                        <span key={v} className="radio">
                          <input id={`pieNumRdo${i + 1}`} name="pieNumRdoGroup" type="radio"
                            checked={pieCount === v} onChange={() => setPieCount(v)} />
                          <label htmlFor={`pieNumRdo${i + 1}`}>{v}</label>
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>

              {/* 파이 정보 */}
              <tr>
                <th scope="row">파이 정보<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="tbl-wrap">
                    <table className="table reg" style={{ width: '100%' }}>
                      <colgroup>
                        <col style={{ width: 100 }} />
                        <col style={{ width: 160 }} />
                        <col />
                        <col style={{ width: 200 }} />
                        <col style={{ width: 160 }} />
                        <col style={{ width: 160 }} />
                        <col style={{ width: 200 }} />
                        <col style={{ width: 160 }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" className="t-center">위치</th>
                          <th scope="col">당첨 구분</th>
                          <th scope="col">
                            표시 텍스트<span className="ess"><span className="offscreen">필수입력</span></span><br />
                            (파이 개수에 따라 글자 수 차등제한)
                          </th>
                          <th scope="col">
                            지급 리워드 포인트<span className="ess"><span className="offscreen">필수입력</span></span><br />
                            (미지급 시 0 입력)
                          </th>
                          <th scope="col">
                            지급 상품<span className="ess"><span className="offscreen">필수입력</span></span><br />
                            (꽝 설정 시 상품 호출 불가)
                          </th>
                          <th scope="col">
                            제세공과금 대상<span className="ess"><span className="offscreen">필수입력</span></span><br />
                            (설정 시 수동 방송)
                          </th>
                          <th scope="col">
                            당첨 인원 제한 설정<span className="ess"><span className="offscreen">필수입력</span></span><br />
                            (사용 체크 안함 : 무제한 당첨)
                          </th>
                          <th scope="col">
                            기본 확률<span className="ess"><span className="offscreen">필수입력</span></span><br />
                            (합계 100%)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pieRows.map((row, idx) => (
                          <tr key={row.id}>
                            {/* 위치 */}
                            <td className="t-center">
                              <div className={`evt-pie-${pieCount}-${idx + 1}`} />
                            </td>

                            {/* 당첨 구분 */}
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <span className="radio">
                                    <input id={`isPrize${row.id}L`} name={`isPrizeGroup${row.id}`} type="radio"
                                      checked={row.isPrize === 'lose'} onChange={() => updateRow(row.id, { isPrize: 'lose' })} />
                                    <label htmlFor={`isPrize${row.id}L`}>꽝</label>
                                  </span>
                                  <span className="radio">
                                    <input id={`isPrize${row.id}W`} name={`isPrizeGroup${row.id}`} type="radio"
                                      checked={row.isPrize === 'win'} onChange={() => updateRow(row.id, { isPrize: 'win' })} />
                                    <label htmlFor={`isPrize${row.id}W`}>당첨</label>
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* 표시 텍스트 */}
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <input type="text" className="form-control" value={row.text}
                                    onChange={e => updateRow(row.id, { text: e.target.value })}
                                    placeholder="00자까지 입력할 수 있습니다." />
                                </div>
                              </div>
                            </td>

                            {/* 지급 리워드 포인트 */}
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <input type="text" className="form-control" readOnly value={row.rewardPolicy}
                                    onChange={e => updateRow(row.id, { rewardPolicy: e.target.value })} />
                                  <button type="button" className="btn btn-slm">정책검색</button>
                                </div>
                              </div>
                            </td>

                            {/* 지급 상품 */}
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <input type="text" className="form-control" value={row.product}
                                    onChange={e => updateRow(row.id, { product: e.target.value })} />
                                </div>
                              </div>
                            </td>

                            {/* 제세공과금 대상 */}
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <span className="checkbox">
                                    <input id={`taxTar${row.id}`} name="taxTarGroup" type="checkbox"
                                      checked={row.taxTarget} onChange={e => updateRow(row.id, { taxTarget: e.target.checked })} />
                                    <label htmlFor={`taxTar${row.id}`}>대상</label>
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* 당첨 인원 제한 */}
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <span className="checkbox">
                                    <input id={`limPrize${row.id}`} name="limPrizeGroup" type="checkbox"
                                      checked={row.limitUsed} onChange={e => updateRow(row.id, { limitUsed: e.target.checked })} />
                                    <label htmlFor={`limPrize${row.id}`}>사용</label>
                                  </span>
                                </div>
                                <div className="reg-item">
                                  <input type="text" className="form-control" value={row.limitCount}
                                    onChange={e => updateRow(row.id, { limitCount: e.target.value })}
                                    disabled={!row.limitUsed} />
                                  <span className="unit">명</span>
                                </div>
                              </div>
                            </td>

                            {/* 기본 확률 */}
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <input type="text" className="form-control w-30" value={row.probInt}
                                    onChange={e => updateRow(row.id, { probInt: e.target.value })} />
                                  <span className="unit">.</span>
                                  <input type="text" className="form-control w-30" value={row.probDec}
                                    onChange={e => updateRow(row.id, { probDec: e.target.value })} />
                                  <span className="unit">%</span>
                                </div>
                              </div>
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
