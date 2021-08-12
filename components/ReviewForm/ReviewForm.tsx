import cn from 'classnames';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import React, { useState } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Textarea } from '../Textarea/Textarea';
import { Rating } from '../Rating/Rating';
import CloseIcon from './close.svg';
import CloseIconError from './closeError.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
        ...formData,
        productId,
      });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError('Что-то пошло не так');
      }
    } catch (e) {
      setIsError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          className={styles.inputName}
          placeholder="Имя"
          {...register('name', {
            required: {
              value: true,
              message: 'Заполните имя',
            },
          })}
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        <Input
          className={styles.inputTitle}
          placeholder="Заголовок отзыва"
          {...register('title', {
            required: {
              value: true,
              message: 'Заполните заголовок',
            },
          })}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        <div className={styles.rating}>
          <span>Oценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: {
                value: true,
                message: 'Поставьте оценку',
              },
            }}
            render={({ field }) => (
              <Rating
                rating={field.value}
                ref={field.ref}
                isEditable
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          className={styles.textareaWrapper}
          placeholder="Текст отзыва"
          {...register('description', {
            required: {
              value: true,
              message: 'Заполните описание',
            },
          })}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? 'true' : 'false'}
        />
        <div className={styles.submit}>
          <Button tabIndex={isOpened ? 0 : -1} appearance="primary" onClick={() => clearErrors()}>
            Отправить
          </Button>
          <span> *Перед публикацией отзыв пройдет предварительную модерацию</span>
        </div>
      </div>
      {isSuccess && (
        <div className={styles.success} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен.</div>
          <div className={styles.successDescription}>
            Спасибо, Ваш отзыв будет опубликован после проверки модератором.
          </div>
          <button
            className={styles.closeIcon}
            onClick={() => setIsSuccess(false)}
            aria-label="закрыть оповещение">
            <CloseIcon />
          </button>
        </div>
      )}
      {isError && (
        <div
          className={cn(styles.success, {
            [styles.error]: isError,
          })}>
          <div className={styles.errorTitle}>{isError}</div>
          <div className={styles.errorDescription}>
            Ошибка. <br />
            Нам важен Ваш отзыв, просьба повторить отправку через несколько минут.
          </div>
          <button
            className={styles.closeIconError}
            onClick={() => setIsError(undefined)}
            aria-label="закрыть оповещение">
            <CloseIconError />
          </button>
        </div>
      )}
    </form>
  );
};
