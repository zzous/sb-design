import React from 'react';

export default function SectionTitle({ title, showEss = false }: { title: string; showEss?: boolean }) {
  return (
    <div className="ui-title-3">
      <h3>{title}</h3>
      {showEss && (
        <div className="abs">
          <span className="ess" /> 표시는 필수항목입니다.
        </div>
      )}
    </div>
  );
}
