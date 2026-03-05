import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundation/Design Tokens',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

/* ── Color Swatch ── */
function Swatch({ name, cssVar }: { name: string; cssVar: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 64 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          backgroundColor: `var(${cssVar})`,
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      />
      <span style={{ fontSize: 11, color: 'var(--color-neutral-500)', textAlign: 'center' }}>{name}</span>
    </div>
  );
}

function ColorRow({ label, prefix, shades }: { label: string; prefix: string; shades: string[] }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-neutral-500)' }}>
        {label}
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {shades.map((shade) => (
          <Swatch key={shade} name={shade} cssVar={`--color-${prefix}-${shade}`} />
        ))}
      </div>
    </div>
  );
}

export const Colors: Story = {
  name: '색상',
  render: () => {
    const shades = ['50','100','200','300','400','500','600','700','800','900'];
    return (
      <div style={{ padding: 32, fontFamily: 'var(--font-family-base)' }}>
        <ColorRow label="Primary (Navy Blue)" prefix="primary" shades={shades} />
        <ColorRow label="Secondary (Teal)" prefix="secondary" shades={shades} />
        <ColorRow label="Neutral" prefix="neutral" shades={shades} />
        <div style={{ marginBottom: 32 }}>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-neutral-500)' }}>Semantic</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Swatch name="success" cssVar="--color-success" />
            <Swatch name="success-light" cssVar="--color-success-light" />
            <Swatch name="warning" cssVar="--color-warning" />
            <Swatch name="warning-light" cssVar="--color-warning-light" />
            <Swatch name="error" cssVar="--color-error" />
            <Swatch name="error-light" cssVar="--color-error-light" />
            <Swatch name="info" cssVar="--color-info" />
            <Swatch name="info-light" cssVar="--color-info-light" />
          </div>
        </div>
      </div>
    );
  },
};

export const Typography: Story = {
  name: '타이포그래피',
  render: () => (
    <div style={{ padding: 32, fontFamily: 'var(--font-family-base)' }}>
      <p style={{ margin: '0 0 24px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-neutral-500)' }}>Font Size</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {[
          ['xs', '12px'], ['sm', '14px'], ['md', '16px'], ['lg', '18px'],
          ['xl', '20px'], ['2xl', '24px'], ['3xl', '30px'], ['4xl', '36px'],
        ].map(([key, px]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontSize: 'var(--font-size-' + key + ')', color: 'var(--color-neutral-900)', lineHeight: 1.3 }}>
              StarBanking
            </span>
            <span style={{ fontSize: 11, color: 'var(--color-neutral-400)' }}>{key} / {px}</span>
          </div>
        ))}
      </div>

      <p style={{ margin: '0 0 16px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-neutral-500)' }}>Font Weight</p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
        {[
          ['Regular (400)', '400'], ['Medium (500)', '500'],
          ['Semibold (600)', '600'], ['Bold (700)', '700'],
        ].map(([label, weight]) => (
          <div key={weight} style={{ fontWeight: weight, fontSize: 16, color: 'var(--color-neutral-800)' }}>{label}</div>
        ))}
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  name: '스페이싱',
  render: () => (
    <div style={{ padding: 32, fontFamily: 'var(--font-family-base)' }}>
      <p style={{ margin: '0 0 24px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-neutral-500)' }}>Spacing Scale</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          ['--space-1', '4px'], ['--space-2', '8px'], ['--space-3', '12px'],
          ['--space-4', '16px'], ['--space-5', '20px'], ['--space-6', '24px'],
          ['--space-8', '32px'], ['--space-10', '40px'], ['--space-12', '48px'],
          ['--space-16', '64px'],
        ].map(([token, px]) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: `var(${token})`, height: 20, backgroundColor: 'var(--color-primary-400)', borderRadius: 3, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: 'var(--color-neutral-500)', whiteSpace: 'nowrap' }}>
              {token} · {px}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  name: '그림자',
  render: () => (
    <div style={{ padding: 32, fontFamily: 'var(--font-family-base)' }}>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {['xs','sm','md','lg','xl'].map((s) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 12,
              backgroundColor: '#fff',
              boxShadow: `var(--shadow-${s})`,
              border: '1px solid var(--color-neutral-100)',
            }} />
            <span style={{ fontSize: 12, color: 'var(--color-neutral-500)' }}>shadow-{s}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  name: '테두리 반경',
  render: () => (
    <div style={{ padding: 32, fontFamily: 'var(--font-family-base)' }}>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {[
          ['sm', '4px'], ['md', '8px'], ['lg', '12px'], ['xl', '16px'], ['full', '9999px'],
        ].map(([key, px]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 64, height: 64,
              backgroundColor: 'var(--color-primary-100)',
              border: '2px solid var(--color-primary-400)',
              borderRadius: `var(--radius-${key})`,
            }} />
            <span style={{ fontSize: 12, color: 'var(--color-neutral-500)', textAlign: 'center' }}>
              radius-{key}<br />{px}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
