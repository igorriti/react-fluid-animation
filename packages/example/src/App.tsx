import FluidAnimation, { Animation, IAnimationConfig } from "@usertive/react-fluid-animation";

import { useCallback, useRef, useState } from "react";

import "react-dat-gui/dist/index.css";
import GitHubCorner from "react-github-corner";
import styles from "./App.module.css";
import GUI from "./GUI";

const defaultConfig: IAnimationConfig = {
  textureDownsample: 1,
  densityDissipation: 0.98,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 25,
  curl: 30,
  splatRadius: 0.005
};

export default function App() {
  const [config, setConfig] = useState<IAnimationConfig>({ ...defaultConfig });
  const animationRef = useRef<Animation | null>(null);

  const updateConfig = useCallback((newConfig: Partial<IAnimationConfig>) => setConfig({ ...config, ...newConfig }), [config, setConfig]);
  const resetConfig = useCallback(() => setConfig({...defaultConfig}), [setConfig]);
  const makeRandomSplats = useCallback(() => {
    //animationRef.current?.addSplats(5 + Math.random() * 20 | 0);
  }, [animationRef]);

  return (
    <div className={styles.root}>
      <FluidAnimation
        config={config}
        animationRef={(animation) => animationRef.current = animation}
      />

      <div className={styles.overlay}>
        <h1 className={styles.h1}>
          React Fluid Animation
        </h1>
      </div>

      <GitHubCorner
        href="https://github.com/usertive/react-fluid-animation"
        bannerColor="#70B7FD"
        direction="left"
      />

      <GUI
        config={config}
        updateConfig={updateConfig}
        resetConfig={resetConfig}
        makeRandomSplats={makeRandomSplats}
      />
    </div>
  );
}
