import { useRef, useState } from 'react';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + '시');
const MINS  = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0') + '분');

const POS_OPTIONS: Record<string, string[]> = {
  투데이:   ['띠배너1(일반챌린지)', '띠배너2(이벤트)', '메인배너1', '메인배너2'],
  건강:     ['선택하세요', '상단배너', '중간배너'],
  챌린지:   ['선택하세요', '상단배너', '하단배너'],
  커뮤니티: ['선택하세요', '상단배너', '중간배너'],
};

export function BannerRegisterPage() {
  const fileRef = useRef<HTMLInputElement>(null);

  /* 기본 정보 */
  const [bannerName,   setBannerName]   = useState('룰렛이벤트 10월');
  const [bannerType,   setBannerType]   = useState<'메인배너' | '띠배너'>('띠배너');

  /* 노출 위치 */
  const [posTab,    setPosTab]    = useState('투데이');
  const [posSel,    setPosSel]    = useState<Record<string, string>>({
    투데이: '띠배너1(일반챌린지)', 건강: '선택하세요', 챌린지: '선택하세요', 커뮤니티: '선택하세요',
  });

  /* 노출 상태 */
  const [openStatus, setOpenStatus] = useState<'비노출' | '노출'>('비노출');
  const [startDate,  setStartDate]  = useState('');
  const [startHour,  setStartHour]  = useState('00시');
  const [startMin,   setStartMin]   = useState('00분');
  const [endDate,    setEndDate]    = useState('');
  const [endHour,    setEndHour]    = useState('00시');
  const [endMin,     setEndMin]     = useState('00분');

  /* 배너 이미지 */
  const [imgFile,    setImgFile]    = useState<File | null>(null);
  const [imgAlt,     setImgAlt]     = useState('10월 꽝없는 룰렛이벤트 매일 참여가능');

  /* 랜딩 URL */
  const [urlType,    setUrlType]    = useState('직접입력');
  const [landingUrl, setLandingUrl] = useState('https://mobile.kbbank.co.kr/event/evt_10');
  const [urlTarget,  setUrlTarget]  = useState('새창');

  /* 노출 대상 */
  const [targetType, setTargetType] = useState<'전체' | '회원그룹' | '업로드'>('전체');
  const [uploadFile, setUploadFile] = useState('');

  const clearImg = () => { setImgFile(null); if (fileRef.current) fileRef.current.value = ''; };

  return (
    <div style={{ padding: '20px 0 0' }}>
      <div className="ui-section">
        <div className="ui-content">
          <div className="ui-grid-top-guide t-right">
            <span className="ess" /> 표시는 필수항목입니다.
          </div>
          <div className="tbl-wrap mt-10">
            <table className="table reg" style={{ width: '100%' }}>
              <colgroup>
                <col style={{ width: 160 }} />
                <col />
                <col style={{ width: 160 }} />
                <col />
              </colgroup>
              <tbody>

                {/* 배너명 */}
                <tr>
                  <th scope="row">배너명<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group">
                      <div className="reg-item">
                        <input type="text" className="form-control" value={bannerName}
                          onChange={e => setBannerName(e.target.value)} />
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 배너 유형 */}
                <tr>
                  <th scope="row">배너 유형<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group">
                      <div className="reg-item">
                        {(['메인배너', '띠배너'] as const).map((v, i) => (
                          <span key={v} className="radio">
                            <input id={`bnType${i + 1}`} name="bnTypeGroup" type="radio"
                              checked={bannerType === v} onChange={() => setBannerType(v)} />
                            <label htmlFor={`bnType${i + 1}`}>{v}</label>
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 노출 위치 */}
                <tr>
                  <th scope="row">노출 위치<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group inline">
                      {Object.keys(POS_OPTIONS).map((tab, i) => (
                        <div key={tab} className="reg-item">
                          <span className="radio">
                            <input id={`posType${i + 1}`} name="posTypeGroup" type="radio"
                              checked={posTab === tab} onChange={() => setPosTab(tab)} />
                            <label htmlFor={`posType${i + 1}`}>{tab}</label>
                          </span>
                          <select className="custom-select"
                            value={posSel[tab]}
                            onChange={e => setPosSel(p => ({ ...p, [tab]: e.target.value }))}
                            disabled={posTab !== tab}
                          >
                            {POS_OPTIONS[tab].map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>

                {/* 노출 상태 */}
                <tr>
                  <th scope="row">노출 상태<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group inline">
                      <div className="reg-item">
                        {(['비노출', '노출'] as const).map((v, i) => (
                          <span key={v} className="radio">
                            <input id={`openRdo${i + 1}`} name="openRdoGroup" type="radio"
                              checked={openStatus === v} onChange={() => setOpenStatus(v)} />
                            <label htmlFor={`openRdo${i + 1}`}>{v}</label>
                          </span>
                        ))}
                      </div>
                      <div className="reg-item">
                        <div className="ui-datepicker-range">
                          <input type="date" className="form-control" style={{ width: 140 }}
                            value={startDate} onChange={e => setStartDate(e.target.value)} />
                          <select className="custom-select time" value={startHour} onChange={e => setStartHour(e.target.value)}>
                            {HOURS.map(h => <option key={h}>{h}</option>)}
                          </select>
                          <select className="custom-select time" value={startMin} onChange={e => setStartMin(e.target.value)}>
                            {MINS.map(m => <option key={m}>{m}</option>)}
                          </select>
                          <span className="ui-coupler">~</span>
                          <input type="date" className="form-control" style={{ width: 140 }}
                            value={endDate} onChange={e => setEndDate(e.target.value)} />
                          <select className="custom-select time" value={endHour} onChange={e => setEndHour(e.target.value)}>
                            {HOURS.map(h => <option key={h}>{h}</option>)}
                          </select>
                          <select className="custom-select time" value={endMin} onChange={e => setEndMin(e.target.value)}>
                            {MINS.map(m => <option key={m}>{m}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 배너 이미지 / 이미지 설명 */}
                <tr>
                  <th scope="row">배너 이미지<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        <div className="btn-file">
                          <input ref={fileRef} type="file" id="bannerImgFile" hidden accept="image/*"
                            onChange={e => setImgFile(e.target.files?.[0] ?? null)} />
                          <label className="btn-up" htmlFor="bannerImgFile">파일첨부</label>
                        </div>
                      </div>
                    </div>
                    {imgFile && (
                      <div className="upload-file-box">
                        <div className="upload-file-head flex space-between">
                          <button type="button" className="btn del-all btn-secondary" onClick={clearImg}>
                            <span className="offscreen">전체파일삭제</span>
                          </button>
                          <span className="name">파일명</span>
                          <span className="volume">용량</span>
                        </div>
                        <div className="upload-file-list">
                          <div className="upload-file-list-item flex space-between">
                            <button type="button" className="btn del btn-secondary" onClick={clearImg}>
                              <span className="offscreen">파일삭제</span>
                            </button>
                            <span className="name">{imgFile.name}</span>
                            <span className="img">
                              <img src={URL.createObjectURL(imgFile)} alt="미리보기" style={{ height: 40, objectFit: 'cover' }} />
                            </span>
                            <span className="volume">{(imgFile.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <th scope="row">이미지 설명<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td>
                    <div className="reg-group">
                      <div className="reg-item">
                        <input type="text" className="form-control" value={imgAlt}
                          onChange={e => setImgAlt(e.target.value)} />
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 랜딩 URL */}
                <tr>
                  <th scope="row">랜딩 URL<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group inline">
                      <div className="reg-item" style={{ flex: '0 0 auto' }}>
                        <select className="custom-select" value={urlType} onChange={e => setUrlType(e.target.value)}>
                          <option>직접입력</option>
                          <option>이벤트 선택</option>
                        </select>
                      </div>
                      <div className="reg-item" style={{ flex: 1 }}>
                        <input type="text" className="form-control" value={landingUrl}
                          onChange={e => setLandingUrl(e.target.value)} />
                      </div>
                      <div className="reg-item" style={{ flex: '0 0 auto' }}>
                        <select className="custom-select" value={urlTarget} onChange={e => setUrlTarget(e.target.value)}>
                          <option>새창</option>
                          <option>현재창</option>
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* 노출 대상 */}
                <tr>
                  <th scope="row">노출 대상<span className="ess"><span className="offscreen">필수입력</span></span></th>
                  <td colSpan={3}>
                    <div className="reg-group inline">
                      <div className="reg-item">
                        <span className="radio">
                          <input id="openTar1" name="openTarGroup" type="radio"
                            checked={targetType === '전체'} onChange={() => setTargetType('전체')} />
                          <label htmlFor="openTar1">전체 B2C 회원</label>
                        </span>
                      </div>
                      <div className="reg-item">
                        <span className="radio">
                          <input id="openTar2" name="openTarGroup" type="radio"
                            checked={targetType === '회원그룹'} onChange={() => setTargetType('회원그룹')} />
                          <label htmlFor="openTar2">회원그룹</label>
                        </span>
                        <div className="reg-item">
                          <button type="button" className="btn btn-slm" disabled={targetType !== '회원그룹'}>찾기</button>
                        </div>
                      </div>
                      <div className="reg-item">
                        <span className="radio">
                          <input id="openTar3" name="openTarGroup" type="radio"
                            checked={targetType === '업로드'} onChange={() => setTargetType('업로드')} />
                          <label htmlFor="openTar3">노출대상 업로드</label>
                        </span>
                        <div className="reg-item">
                          <input type="text" className="form-control" value={uploadFile}
                            onChange={e => setUploadFile(e.target.value)}
                            disabled={targetType !== '업로드'} />
                          <button type="button" className="btn btn-slm" disabled={targetType !== '업로드'}>찾기</button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* 하단 버튼 */}
          <div className="btn-bottom-set flex justify-center" style={{ marginTop: 32, gap: 8 }}>
            <button type="button" className="btn btn-sl nega">목록</button>
            <button type="button" className="btn btn-sl nega">삭제</button>
            <button type="button" className="btn btn-sl posi">저장</button>
          </div>
        </div>
      </div>
    </div>
  );
}
