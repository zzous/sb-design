import React from 'react';
import SectionTitle from './SectionTitle';

export interface QuizAnswer {
  id: number;
  text: string;
}

interface Props {
  answers:        QuizAnswer[];
  setAnswers:     (v: QuizAnswer[]) => void;
  correctIdx:     number | null;
  setCorrectIdx:  (v: number | null) => void;
  hintType:       'link' | 'text';
  setHintType:    (v: 'link' | 'text') => void;
  hintLink:       string;
  setHintLink:    (v: string) => void;
  hintText:       string;
  setHintText:    (v: string) => void;
}

export default function QuizFunctionSection({
  answers, setAnswers,
  correctIdx, setCorrectIdx,
  hintType, setHintType,
  hintLink, setHintLink,
  hintText, setHintText,
}: Props) {
  const updateAnswer = (id: number, text: string) =>
    setAnswers(answers.map(a => a.id === id ? { ...a, text } : a));

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
              <tr>
                {/* 답변 (내부 테이블) */}
                <th scope="row">답변<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  <div className="tbl-wrap">
                    <table className="table reg" style={{ width: '100%' }}>
                      <colgroup>
                        <col style={{ width: 60 }} />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" className="chk">정답</th>
                          <th scope="col">답변<span className="ess"><span className="offscreen">필수입력</span></span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {answers.map((ans, i) => (
                          <tr key={ans.id}>
                            <td style={{ textAlign: 'center' }}>
                              <span className="radio">
                                <input
                                  id={`correctRdo${ans.id}`}
                                  name="correctRdoGroup"
                                  type="radio"
                                  checked={correctIdx === i}
                                  onChange={() => setCorrectIdx(i)}
                                />
                                <label htmlFor={`correctRdo${ans.id}`} />
                              </span>
                            </td>
                            <td>
                              <div className="reg-group wp-100">
                                <div className="reg-item">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={ans.text}
                                    onChange={e => updateAnswer(ans.id, e.target.value)}
                                    placeholder={`답변 ${i + 1}`}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>

                {/* 힌트 이벤트 */}
                <th scope="row">힌트 이벤트<span className="ess"><span className="offscreen">필수입력</span></span></th>
                <td>
                  {/* 외부 링크 */}
                  <div className="reg-group flex-column">
                    <div className="reg-item">
                      <span className="radio">
                        <input
                          id="hintRdoLink"
                          name="hintRdoGroup"
                          type="radio"
                          checked={hintType === 'link'}
                          onChange={() => setHintType('link')}
                        />
                        <label htmlFor="hintRdoLink">외부 링크</label>
                      </span>
                    </div>
                    <div className="reg-item wp-100">
                      <input
                        type="text"
                        className="form-control"
                        value={hintLink}
                        onChange={e => setHintLink(e.target.value)}
                        placeholder="http 또는 https 를 포함한 URL을 입력하십시오"
                        disabled={hintType !== 'link'}
                      />
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <div className="reg-group flex-column">
                    <div className="reg-item">
                      <span className="radio">
                        <input
                          id="hintRdoText"
                          name="hintRdoGroup"
                          type="radio"
                          checked={hintType === 'text'}
                          onChange={() => setHintType('text')}
                        />
                        <label htmlFor="hintRdoText">텍스트</label>
                      </span>
                    </div>
                    <div className="reg-item wp-100">
                      <div className="textarea wp-100">
                        <textarea
                          className="form-control"
                          value={hintText}
                          onChange={e => setHintText(e.target.value.slice(0, 100))}
                          placeholder="Enter를 사용할 수 있습니다."
                          style={{ height: 80 }}
                          disabled={hintType !== 'text'}
                        />
                        <div className="txt-counter">
                          <strong>{hintText.length}</strong> / <span>100</span>
                        </div>
                      </div>
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
