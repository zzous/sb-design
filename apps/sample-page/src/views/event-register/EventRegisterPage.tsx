import React, { useState, useRef } from 'react';
import NormalFunctionSection from './NormalFunctionSection';
import QuizFunctionSection, { QuizAnswer } from './QuizFunctionSection';
import RouletFunctionSection from './RouletFunctionSection';
import AttendanceFunctionSection from './AttendanceFunctionSection';
import SectionTitleComp from './SectionTitle';

/* ── Types ── */
interface Chip    { id: number; label: string; }
interface TermRow { id: number; required: string; subject: string; name: string; version: string; date: string; checked: boolean; }
interface ContentRow { id: number; file: File | null; desc: string; order: string; checked: boolean; }

/* ── Initial data ── */
const INIT_CHIPS: Chip[] = [
  { id: 1, label: 'KB카드' },
  { id: 2, label: 'KB손해보험' },
  { id: 3, label: '군 간부' },
  { id: 4, label: '공항철도' },
];

const INIT_TERMS: TermRow[] = [
  { id: 1, required: '필수', subject: 'KBHC',  name: '이벤트 이용 약관',       version: 'V1.12.1', date: '2023-09-25 16:12:33', checked: false },
  { id: 2, required: '선택', subject: '휴노',   name: '제 3자 개인정보 수집 동의', version: 'V1.12.1', date: '2023-09-25 16:12:33', checked: false },
];

const INIT_CONTENT: ContentRow[] = [
  { id: 1, file: null, desc: '', order: '', checked: false },
  { id: 2, file: null, desc: '', order: '', checked: false },
];

const SectionTitle = SectionTitleComp;

/* ── Sub-components ── */
function FileUpload({ id, file, onFile }: { id: string; file: File | null; onFile: (f: File | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="btn-file">
        <input ref={ref} type="file" id={id} hidden onChange={e => onFile(e.target.files?.[0] ?? null)} />
        <label className="btn-up" htmlFor={id}>파일첨부</label>
      </div>
      {file && (
        <div className="upload-file-box">
          <div className="upload-file-head flex space-between">
            <button type="button" className="btn del-all btn-secondary" onClick={() => { onFile(null); if (ref.current) ref.current.value = ''; }}>
              <span className="offscreen">전체파일삭제</span>
            </button>
            <span className="name">파일명</span>
            <span className="volume">용량</span>
          </div>
          <div className="upload-file-list">
            <div className="upload-file-list-item flex space-between">
              <button type="button" className="btn del btn-secondary" onClick={() => { onFile(null); if (ref.current) ref.current.value = ''; }}>
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

/* ── Main Page ── */
export default function EventRegisterPage() {
  /* 기본 정보 */
  const [title,        setTitle]        = useState('');
  const [evtType,      setEvtType]      = useState('일반');
  const [isPost,       setIsPost]       = useState('게시');
  const [evtTarget,    setEvtTarget]    = useState('모든 사용자');
  const [chips,        setChips]        = useState<Chip[]>(INIT_CHIPS);
  const [limitType,    setLimitType]    = useState('');
  const [limitCount,   setLimitCount]   = useState('');
  const [startDate,    setStartDate]    = useState('');
  const [endDate,      setEndDate]      = useState('');
  const [benefitType,  setBenefitType]  = useState('즉시 지급');
  const [winnerDate,   setWinnerDate]   = useState('');
  const [terms,        setTerms]        = useState<TermRow[]>(INIT_TERMS);
  const [allTerms,     setAllTerms]     = useState(false);
  const [marketing,    setMarketing]    = useState(false);
  const [contractNo,   setContractNo]   = useState('');

  /* 이벤트 배너 */
  const [bannerFile,   setBannerFile]   = useState<File | null>(null);
  const [bannerDesc,   setBannerDesc]   = useState('');

  /* 메인 콘텐츠 */
  const [mainRows,     setMainRows]     = useState<ContentRow[]>(INIT_CONTENT);
  const [allMain,      setAllMain]      = useState(false);

  /* 기타 콘텐츠 */
  const [bgFile,       setBgFile]       = useState<File | null>(null);
  const [bgDesc,       setBgDesc]       = useState('');
  const [bottomFile,   setBottomFile]   = useState<File | null>(null);
  const [bottomDesc,   setBottomDesc]   = useState('');

  /* 기능 설정 - 일반 */
  const [btnEvent,     setBtnEvent]     = useState('');
  const [btnName,      setBtnName]      = useState('');
  const [externalLink, setExternalLink] = useState('');

  /* 기능 설정 - 퀴즈 */
  const [quizAnswers,  setQuizAnswers]  = useState<QuizAnswer[]>([
    { id: 1, text: '' }, { id: 2, text: '' }, { id: 3, text: '' }, { id: 4, text: '' },
  ]);
  const [correctIdx,   setCorrectIdx]   = useState<number | null>(null);
  const [hintType,     setHintType]     = useState<'link' | 'text'>('link');
  const [hintLink,     setHintLink]     = useState('');
  const [hintText,     setHintText]     = useState('');

  /* 혜택 설정 */
  const [firstCome,    setFirstCome]    = useState(false);
  const [firstCount,   setFirstCount]   = useState('');
  const [rewardType,   setRewardType]   = useState('');
  const [rewardAmount, setRewardAmount] = useState('');

  /* ── Helpers ── */
  const removeChip = (id: number) => setChips(p => p.filter(c => c.id !== id));

  const toggleAllTerms = (checked: boolean) => {
    setAllTerms(checked);
    setTerms(p => p.map(t => ({ ...t, checked })));
  };
  const toggleTerm = (id: number, checked: boolean) =>
    setTerms(p => p.map(t => t.id === id ? { ...t, checked } : t));

  const addMainRow = () =>
    setMainRows(p => [...p, { id: Date.now(), file: null, desc: '', order: '', checked: false }]);
  const removeCheckedMainRows = () =>
    setMainRows(p => p.filter(r => !r.checked));
  const updateMain = (id: number, patch: Partial<ContentRow>) =>
    setMainRows(p => p.map(r => r.id === id ? { ...r, ...patch } : r));
  const toggleAllMain = (checked: boolean) => {
    setAllMain(checked);
    setMainRows(p => p.map(r => ({ ...r, checked })));
  };

  /* ── Render ── */
  return (
    <div>
      {/* ═══════════════════════════════
          1. 기본 정보
      ═══════════════════════════════ */}
      <div className="ui-section">
        <SectionTitle title="기본 정보" showEss />
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

                {/* 제목 */}
                <tr>
                  <th scope="row">제목<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group wp-100">
                      <div className="reg-item">
                        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} placeholder="이벤트 제목을 입력하세요" />
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 이벤트 유형 / 게시 여부 */}
                <tr>
                  <th scope="row">이벤트 유형<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        {['일반', '퀴즈', '룰렛', '출석'].map(v => (
                          <span key={v} className="radio">
                            <input id={`evtType-${v}`} name="evtTypeGroup" type="radio"
                              checked={evtType === v} onChange={() => setEvtType(v)} />
                            <label htmlFor={`evtType-${v}`}>{v}</label>
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <th scope="row">게시 여부<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        {['게시', '비게시'].map(v => (
                          <span key={v} className="radio">
                            <input id={`isPost-${v}`} name="isPostGroup" type="radio"
                              checked={isPost === v} onChange={() => setIsPost(v)} />
                            <label htmlFor={`isPost-${v}`}>{v}</label>
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 이벤트 대상 */}
                <tr>
                  <th scope="row">이벤트 대상<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group">
                      <div className="reg-item">
                        {['모든 사용자', '회원 그룹 선택', '건강 정보 동의 회원'].map((v, i) => (
                          <span key={v} className="radio">
                            <input id={`evtTar-${i}`} name="evtTarGroup" type="radio"
                              checked={evtTarget === v} onChange={() => setEvtTarget(v)} disabled={i === 2} />
                            <label htmlFor={`evtTar-${i}`}>{v}</label>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="reg-group">
                      <div className="reg-item">
                        <button type="button" className="btn btn-slm">회원 그룹 선택</button>
                      </div>
                    </div>
                    <div className="reg-group wp-100">
                      <div className="reg-item">
                        <div className="ui-chips">
                          {chips.map(chip => (
                            <div key={chip.id} className="ui-chips-item">
                              <span>{chip.label}</span>
                              <button type="button" className="ui-chips-del" onClick={() => removeChip(chip.id)}>
                                <span className="offscreen">삭제하기</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 참여 제한 / 이벤트 기간 */}
                <tr>
                  <th scope="row">참여 제한<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group inline">
                      <div className="reg-item">
                        <select className="custom-select" value={limitType} onChange={e => setLimitType(e.target.value)}>
                          <option value="">선택</option>
                          <option value="daily">1일 제한</option>
                          <option value="total">전체 제한</option>
                        </select>
                      </div>
                      <div className="reg-item">
                        <input type="text" className="form-control" style={{ width: 50 }}
                          value={limitCount} onChange={e => setLimitCount(e.target.value)} />
                        <span className="ui-unit">회</span>
                      </div>
                    </div>
                  </td>
                  <th scope="row">이벤트 기간<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        <div className="ui-datepicker-range">
                          <input type="date" className="form-control" style={{ width: 140 }}
                            value={startDate} onChange={e => setStartDate(e.target.value)} />
                          <span className="ui-coupler">~</span>
                          <input type="date" className="form-control" style={{ width: 140 }}
                            value={endDate} onChange={e => setEndDate(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 혜택 구분 / 당첨자 발표일 */}
                <tr>
                  <th scope="row">혜택 구분<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        {['즉시 지급', '당첨후 지급', '혜택 없음'].map(v => (
                          <span key={v} className="radio">
                            <input id={`benType-${v}`} name="benTypeGroup" type="radio"
                              checked={benefitType === v} onChange={() => setBenefitType(v)} />
                            <label htmlFor={`benType-${v}`}>{v}</label>
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <th scope="row">당첨자 발표일<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        <input type="date" className="form-control" style={{ width: 140 }}
                          value={winnerDate} onChange={e => setWinnerDate(e.target.value)} />
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 약관 */}
                <tr>
                  <th scope="row">약관</th>
                  <td colSpan={3}>
                    <div className="table-util">
                      <div className="btn-set-m flex">
                        <button type="button" className="btn btn-ss">추가</button>
                        <button type="button" className="btn btn-ss">삭제</button>
                      </div>
                    </div>
                    <div className="tbl-wrap mt-10">
                      <div className="table-list">
                        <table className="table list" style={{ width: '100%' }}>
                          <caption>약관목록</caption>
                          <colgroup>
                            <col style={{ width: 45 }} />
                            <col style={{ width: 100 }} />
                            <col style={{ width: 120 }} />
                            <col />
                            <col style={{ width: 100 }} />
                            <col style={{ width: 160 }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col" className="t-left">
                                <span className="checkbox">
                                  <input id="termChkAll" name="termGroup" type="checkbox"
                                    checked={allTerms} onChange={e => toggleAllTerms(e.target.checked)} />
                                  <label htmlFor="termChkAll" />
                                </span>
                              </th>
                              <th scope="col">필수 여부</th>
                              <th scope="col">약관 주체</th>
                              <th scope="col">약관명</th>
                              <th scope="col">버전</th>
                              <th scope="col">개정 적용일</th>
                            </tr>
                          </thead>
                          <tbody>
                            {terms.map(t => (
                              <tr key={t.id}>
                                <td>
                                  <span className="checkbox">
                                    <input id={`termChk${t.id}`} name="termGroup" type="checkbox"
                                      checked={t.checked} onChange={e => toggleTerm(t.id, e.target.checked)} />
                                    <label htmlFor={`termChk${t.id}`} />
                                  </span>
                                </td>
                                <td>{t.required}</td>
                                <td>{t.subject}</td>
                                <td style={{ textAlign: 'left' }}>{t.name}</td>
                                <td>{t.version}</td>
                                <td>{t.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 마케팅 정보 PUSH */}
                <tr>
                  <th scope="row">마케팅 정보 PUSH<br />수신동의</th>
                  <td colSpan={3}>
                    <div className="reg-group">
                      <div className="reg-item">
                        <span className="checkbox">
                          <input id="marketingPush" name="essGroup" type="checkbox"
                            checked={marketing} onChange={e => setMarketing(e.target.checked)} />
                          <label htmlFor="marketingPush">필수</label>
                        </span>
                        <span className="input-guide inline">
                          '필수' 선택 시 마케팅 정보(PUSH) 수신에 동의한 회원만 이벤트 참여가 가능합니다.
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 전자계약 번호 */}
                <tr>
                  <th scope="row">전자계약 번호</th>
                  <td colSpan={3}>
                    <div className="reg-group inline">
                      <div className="reg-item">
                        <input type="text" className="form-control" style={{ width: 200 }}
                          value={contractNo} onChange={e => setContractNo(e.target.value)} placeholder="계약 번호 입력" />
                        <button type="button" className="btn btn-slm">찾기</button>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════
          2. 이벤트 배너
      ═══════════════════════════════ */}
      <div className="ui-section">
        <SectionTitle title="이벤트 배너" showEss />
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
                  <th scope="row">배너 이미지<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        <FileUpload id="bannerFile" file={bannerFile} onFile={setBannerFile} />
                      </div>
                    </div>
                  </td>
                  <th scope="row">이미지 설명<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group wp-100">
                      <div className="reg-item">
                        <input type="text" className="form-control" value={bannerDesc} onChange={e => setBannerDesc(e.target.value)}
                          placeholder="텍스트 리더기로 읽을 수 있도록 이미지 내용을 입력하십시오" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ui-table-guide">
            <span className="input-guide">배너 이미지는 000 * 000 px 기준으로 제작되어야 합니다.</span>
            <span className="input-guide">이미지 설명은 시각 장애인이 텍스트 리더기를 통해 읽을 수 있도록 사용하는 목적이므로 가급적 자세한 정보를 입력하십시오.</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════
          3. 메인 콘텐츠
      ═══════════════════════════════ */}
      <div className="ui-section">
        <SectionTitle title="메인 콘텐츠" />
        <div className="ui-content">
          <div className="table-util flex space-between">
            <div className="btn-set-m flex">
              <button type="button" className="btn btn-ss" onClick={addMainRow}>추가</button>
              <button type="button" className="btn btn-ss" onClick={removeCheckedMainRows}>삭제</button>
            </div>
            <div className="btn-set-m">
              <span className="ess" /> 표시는 필수항목입니다.
            </div>
          </div>
          <div className="tbl-wrap mt-10">
            <table className="table reg" style={{ width: '100%' }}>
              <caption>메인 콘텐츠 등록 목록</caption>
              <colgroup>
                <col style={{ width: 45 }} />
                <col />
                <col />
                <col style={{ width: 120 }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="chk">
                    <span className="checkbox">
                      <input id="mainChkAll" name="mainGroup" type="checkbox"
                        checked={allMain} onChange={e => toggleAllMain(e.target.checked)} />
                      <label htmlFor="mainChkAll" />
                    </span>
                  </th>
                  <th scope="col">메인 콘텐츠 이미지<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <th scope="col">이미지 설명<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <th scope="col">노출 순서<span className="ess"><span className="offscreen">필수입력</span></span></th>
                </tr>
              </thead>
              <tbody>
                {mainRows.map(row => (
                  <tr key={row.id}>
                    <td>
                      <span className="checkbox">
                        <input id={`mainChk${row.id}`} name="mainGroup" type="checkbox"
                          checked={row.checked} onChange={e => updateMain(row.id, { checked: e.target.checked })} />
                        <label htmlFor={`mainChk${row.id}`} />
                      </span>
                    </td>
                    <td>
                      <div className="reg-group wp-100">
                        <div className="reg-item">
                          <FileUpload id={`mainFile${row.id}`} file={row.file} onFile={f => updateMain(row.id, { file: f })} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="reg-group wp-100">
                        <div className="reg-item">
                          <input type="text" className="form-control" value={row.desc}
                            onChange={e => updateMain(row.id, { desc: e.target.value })}
                            placeholder="텍스트 리더기로 읽을 수 있도록 이미지 내용을 입력하십시오" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="reg-group inline">
                        <div className="reg-item">
                          <input type="text" className="form-control" style={{ width: 80 }} value={row.order}
                            onChange={e => updateMain(row.id, { order: e.target.value })} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ui-table-guide">
            <span className="input-guide">메인 이미지는 가로 000 px 기준으로 제작되어야 합니다.</span>
            <span className="input-guide">이미지 설명은 시각 장애인이 텍스트 리더기를 통해 읽을 수 있도록 사용하는 목적이므로 가급적 자세한 정보를 입력하십시오.</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════
          4. 기타 콘텐츠
      ═══════════════════════════════ */}
      <div className="ui-section">
        <SectionTitle title="기타 콘텐츠" />
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
                  <th scope="row">백그라운드 이미지</th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        <FileUpload id="bgFile" file={bgFile} onFile={setBgFile} />
                      </div>
                    </div>
                  </td>
                  <th scope="row">이미지 설명</th>
                  <td>
                    <div className="reg-group wp-100">
                      <div className="reg-item">
                        <input type="text" className="form-control" value={bgDesc} onChange={e => setBgDesc(e.target.value)}
                          placeholder="텍스트 리더기로 읽을 수 있도록 이미지 내용을 입력하십시오" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">하단 콘텐츠 이미지</th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        <FileUpload id="bottomFile" file={bottomFile} onFile={setBottomFile} />
                      </div>
                    </div>
                  </td>
                  <th scope="row">이미지 설명</th>
                  <td>
                    <div className="reg-group wp-100">
                      <div className="reg-item">
                        <input type="text" className="form-control" value={bottomDesc} onChange={e => setBottomDesc(e.target.value)}
                          placeholder="텍스트 리더기로 읽을 수 있도록 이미지 내용을 입력하십시오" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ui-table-guide">
            <span className="input-guide">백그라운드 이미지는 룰렛 가로 000 * 세로 000 px / 출석 000 * 000 px 기준으로 제작되어야 합니다.</span>
            <span className="input-guide">하단 콘텐츠 이미지는 가로 000px 기준으로 제작되어야 하며 참여 방법, 유의 사항 등에 사용할 수 있습니다.</span>
            <span className="input-guide">이미지 설명은 시각 장애인이 텍스트 리더기를 통해 읽을 수 있도록 사용하는 목적이므로 가급적 자세한 정보를 입력하십시오.</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════
          5. 기능 설정 (이벤트 유형별)
      ═══════════════════════════════ */}
      {evtType === '일반' && (
        <NormalFunctionSection
          btnEvent={btnEvent}       setBtnEvent={setBtnEvent}
          btnName={btnName}         setBtnName={setBtnName}
          externalLink={externalLink} setExternalLink={setExternalLink}
        />
      )}
      {evtType === '퀴즈' && (
        <QuizFunctionSection
          answers={quizAnswers}     setAnswers={setQuizAnswers}
          correctIdx={correctIdx}   setCorrectIdx={setCorrectIdx}
          hintType={hintType}       setHintType={setHintType}
          hintLink={hintLink}       setHintLink={setHintLink}
          hintText={hintText}       setHintText={setHintText}
        />
      )}
      {evtType === '룰렛' && <RouletFunctionSection />}
      {evtType === '출석' && <AttendanceFunctionSection />}

      {/* ═══════════════════════════════
          6. 혜택 설정
      ═══════════════════════════════ */}
      <div className="ui-section">
        <SectionTitle title="혜택 설정" showEss />
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
                  <th scope="row">선착순 설정<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group inline">
                      <div className="reg-item">
                        <span className="checkbox">
                          <input id="firstCome" type="checkbox" checked={firstCome} onChange={e => setFirstCome(e.target.checked)} />
                          <label htmlFor="firstCome">선착순 적용</label>
                        </span>
                      </div>
                      <div className="reg-item">
                        <input type="text" className="form-control" style={{ width: 80 }} value={firstCount}
                          onChange={e => setFirstCount(e.target.value)} disabled={!firstCome} placeholder="명" />
                        <span className="ui-unit">명</span>
                      </div>
                    </div>
                  </td>
                  <th scope="row">혜택 유형<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        <select className="custom-select" value={rewardType} onChange={e => setRewardType(e.target.value)}>
                          <option value="">선택</option>
                          <option value="point">포인트</option>
                          <option value="coupon">쿠폰</option>
                          <option value="gift">상품권</option>
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">혜택 금액/수량<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group inline">
                      <div className="reg-item">
                        <input type="text" className="form-control" style={{ width: 150 }} value={rewardAmount}
                          onChange={e => setRewardAmount(e.target.value)} placeholder="금액 또는 수량 입력" />
                        <span className="ui-unit">원 / 개</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════
          하단 버튼
      ═══════════════════════════════ */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40, paddingBottom: 40 }}>
        <button type="button" className="btn btn-sl">취소</button>
        <button type="button" className="btn btn-sl posi">등록</button>
      </div>
    </div>
  );
}
