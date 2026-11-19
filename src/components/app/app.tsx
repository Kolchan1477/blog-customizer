import { defaultArticleState, type ArticleStateType } from '@/constants/articleProps'; // Добавили type и ArticleStateType
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { CSSProperties } from 'react';

import styles from './index.module.scss';

export const App = (): React.JSX.Element => {
  // Создаем состояние для примененных настроек. По умолчанию берем дефолтные.
  const [appliedState, setAppliedState] =
    useState<ArticleStateType>(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          // Используем значения из состояния, а не константы
          '--font-family': appliedState.fontFamilyOption.value,
          '--font-size': appliedState.fontSizeOption.value,
          '--font-color': appliedState.fontColor.value,
          '--container-width': appliedState.contentWidth.value,
          '--bg-color': appliedState.backgroundColor.value,
        } as CSSProperties
      }
    >
      {/* Передаем сеттер (функцию изменения состояния) в форму как пропс onApply */}
      <ArticleParamsForm onApply={setAppliedState} />
      <Article />
    </main>
  );
};
