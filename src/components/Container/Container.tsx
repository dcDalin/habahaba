import React from 'react';
import styles from './Container.module.scss';

export interface Props {
  children: React.ReactNode;
}

const ContainerWrapper: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return <div className={styles.wrapper}>{children}</div>;
};

export default ContainerWrapper;
