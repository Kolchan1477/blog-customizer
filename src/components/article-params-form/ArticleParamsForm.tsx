import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  type ArticleStateType,
  type OptionType,
} from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    if (!isFormOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      // Используем instanceof Node вместо as Node
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setIsFormOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen]);

  const handleFieldChange =
    (fieldName: keyof ArticleStateType) =>
    (value: OptionType): void => {
      setFormState((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton
        isOpen={isFormOpen}
        onClick={(): void => setIsFormOpen(!isFormOpen)}
      />

      <aside className={clsx(styles.container, { [styles.container_open]: isFormOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleFieldChange('fontFamilyOption')}
          />

          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFieldChange('fontSizeOption')}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleFieldChange('fontColor')}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleFieldChange('backgroundColor')}
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleFieldChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
