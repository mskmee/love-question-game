import React, { FC } from 'react';
import { Button } from '../Button/Button';
import styles from './Main.module.css';

interface MainProps {
  startGame: () => void;
}
export const Main: FC<MainProps> = ({ startGame }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>꧁༺Ask me anything ༻꧂</p>
      <Button
        attributes={{
          onClick: () => startGame(),
          className: styles.btn,
        }}
      >
        Старт
      </Button>
    </div>
  );
};
