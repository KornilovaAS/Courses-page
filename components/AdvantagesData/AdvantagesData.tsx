import React from 'react';
import { AdvantagesDataProps } from './AdvantagesData.props';
import { Htag } from '../Htag/Htag';
import { Ptag } from '../Ptag/Ptag';
import styles from './AdvantagesData.module.css';
import DoneIcon from './done.svg';

export const AdvantagesData = ({ advantages }: AdvantagesDataProps): JSX.Element => {
  return (
    <>
      {advantages.map((ad) => (
        <div key={ad._id} className={styles.advantage}>
          <DoneIcon />
          <Htag tag="h3" className={styles.title}>
            {ad.title}
          </Htag>
          <hr className={styles.vline} />
          <Ptag size="large">{ad.description}</Ptag>
        </div>
      ))}
    </>
  );
};
