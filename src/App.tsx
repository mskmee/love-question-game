import { useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { ChooseGameMode } from './Components/ChooseGameMode/ChooseGameMode';
import { Main } from './Components/Main/Main';
import styles from './App.module.css';

function App() {
  const [isGameModeChoose, setIsGameModeChoose] = useState<boolean>(false);

  const transition = useTransition(isGameModeChoose, {
    from: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
    exitBeforeEnter: true,
  });

  return (
    <animated.div className={isGameModeChoose ? styles.game : styles.menu}>
      {transition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className={styles.main}
          >
            <ChooseGameMode />
          </animated.div>
        ) : (
          <animated.div
            style={style}
            className={styles.main}
          >
            <Main startGame={() => setIsGameModeChoose(!isGameModeChoose)} />
          </animated.div>
        )
      )}
    </animated.div>
  );
}

export default App;
