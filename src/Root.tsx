import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

import ThemeProvider from '@/theme/Provider';
import { UseFullWebSocketProvider } from './socket';
import { mainSocketConfig } from '@/api/globalSocket';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <UseFullWebSocketProvider config={mainSocketConfig(111)}>
          <UseFullWebSocketProvider config={mainSocketConfig(555)}>
            <HelmetProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </HelmetProvider>
          </UseFullWebSocketProvider>
        </UseFullWebSocketProvider>
      </RecoilRoot>
    </StrictMode>,
  );
}

export default render;
