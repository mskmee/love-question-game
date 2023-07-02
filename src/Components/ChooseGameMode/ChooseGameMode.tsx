import { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { data } from '../../data/data';
import styles from './ChooseGameMode.module.css';
import { QuestionCard } from '../QuestionCard/QuestionCard';

export const ChooseGameMode = () => {
  const [isGame, setIsGame] = useState<boolean>(false);
  const [questionsArr, setQuestionsArr] = useState<string[]>([]);

  const allQuestionsHandler = (questions: string[]) => {
    const newValue = !isGame;
    setQuestionsArr(questions);
    setIsGame(newValue);
  };

  const transition = useTransition(isGame, {
    from: { x: -300, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 300, opacity: 0 },
    exitBeforeEnter: true,
  });
  const allQuestions = data.map((el) => el.questions).flat();
  return (
    <div className={styles.wrapper}>
      {transition((style, item) =>
        item ? (
          <animated.div
            className={styles.card}
            style={style}
          >
            <QuestionCard
              anotherTheme={() => setIsGame(false)}
              questions={questionsArr}
            />
          </animated.div>
        ) : (
          <animated.div
            className={styles.container}
            style={style}
          >
            <div
              className={styles.item}
              onClick={() => allQuestionsHandler(allQuestions)}
            >
              <div className={styles.title}>Все вопросы</div>
              <div className={styles.description}>
                Не можешь определиться? Тебе сюда)
              </div>
              <span className={styles.quantity}>
                Количество вопросов: {allQuestions.length}
              </span>
            </div>
            {data.map((el) => (
              <div
                key={el.title}
                className={styles.item}
                onClick={() => allQuestionsHandler(el.questions)}
              >
                <div className={styles.title}>{el.title}</div>
                <div className={styles.description}>{el.description}</div>
                <span className={styles.quantity}>
                  Количество вопросов: {el.questions.length}
                </span>
              </div>
            ))}
          </animated.div>
        )
      )}
    </div>
  );
};
