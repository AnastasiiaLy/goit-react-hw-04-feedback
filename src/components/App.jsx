import React, { useState, useEffect } from 'react';

import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';
import { Section } from './Section';
import { Notification } from './Notification message/Notification';

import styles from './FeedbackOptions/FeedbackOptions.module.css';
import css from './Statistics/Statistics.module.css';

export default function App() {
  const [good, setGood] = useState(
    JSON.parse(window.localStorage.getItem('goodFeedback')) || 0
  );
  const [neutral, setNeutral] = useState(
    JSON.parse(window.localStorage.getItem('neutralFeedback')) || 0
  );
  const [bad, setBad] = useState(
    JSON.parse(window.localStorage.getItem('badFeedback')) || 0
  );

  const totalFeedbackCount = good + neutral + bad;

  const addFeedback = type => {
    if (type === 'good') {
      setGood(prevGood => prevGood + 1);
    } else if (type === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    } else if (type === 'bad') {
      setBad(prevBad => prevBad + 1);
    }
  };

  const countPositiveFeedbackPercentage = () => {
    if (totalFeedbackCount === 0) {
      return 0;
    }
    const positivePercentage = (good / totalFeedbackCount) * 100;
    return Math.round(positivePercentage);
  };

  useEffect(() => {
    console.log('goodFeedback useEffect');
    window.localStorage.setItem('goodFeedback', JSON.stringify(good));
  }, [good]);

  useEffect(() => {
    console.log('neutralFeedback useEffect');
    window.localStorage.setItem('neutralFeedback', JSON.stringify(neutral));
  }, [neutral]);

  useEffect(() => {
    console.log('badFeedback useEffect');
    window.localStorage.setItem('badFeedback', JSON.stringify(bad));
  }, [bad]);

  return (
    <div className="Feedback">
      <Section
        title="Please leave your feedback"
        className={styles.feedback__header}
      >
        <FeedbackOptions
          onGoodFeedback={() => addFeedback('good')}
          onNeutralFeedback={() => addFeedback('neutral')}
          onBadFeedback={() => addFeedback('bad')}
        />
      </Section>

      <Section title="Statistics" className={css.statistics__header}>
        {totalFeedbackCount > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedbackCount}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback yet" />
        )}
      </Section>
    </div>
  );
}
