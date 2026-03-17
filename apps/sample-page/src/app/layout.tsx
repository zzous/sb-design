import '@starbanking/design-system/styles';
import '@starbanking/design-system/legacy-styles';
import '../global.css';
import DynamicShell from './DynamicShell';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <DynamicShell>{children}</DynamicShell>
      </body>
    </html>
  );
}
