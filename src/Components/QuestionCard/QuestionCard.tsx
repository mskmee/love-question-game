import React, { FC, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { Button } from '../Button/Button';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  questions: string[];
  anotherTheme: () => void;
}
type ChangeIndx = 'prev' | 'next';

export const QuestionCard: FC<QuestionCardProps> = ({
  questions,
  anotherTheme,
}) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const transition = useTransition(questionIndex, {
    from: { x: -300, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 300, opacity: 0 },
    exitBeforeEnter: true,
  });

  const changeIndex = (value: ChangeIndx) => {
    if (value === 'prev') {
      const newIndex = questionIndex - 1;
      setQuestionIndex(newIndex);
      return;
    }
    const newIndex = questionIndex + 1;
    setQuestionIndex(newIndex);
  };

  return transition((style, item) => (
    <div className={styles.container}>
      <div className={styles.title}>
        Вопрос #{questionIndex + 1} из {questions.length}
      </div>
      <animated.div
        style={style}
        className={styles.card}
      >
        {questions[questionIndex]}
      </animated.div>
      <div className={styles.btns}>
        <Button attributes={{ onClick: () => anotherTheme() }}>
          Выбрать другую тему
        </Button>
        <Button
          attributes={{
            onClick: () => changeIndex('prev'),
            disabled: questionIndex === 0,
          }}
        >
          Предыдущий вопрос
        </Button>
        <Button
          attributes={{
            onClick: () => changeIndex('next'),
            disabled: questionIndex === questions.length - 1,
          }}
        >
          Следующий вопрос
        </Button>
      </div>
    </div>
  ));
};
