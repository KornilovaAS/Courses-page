import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import React, { ForwardedRef, forwardRef, KeyboardEvent, useRef } from 'react';
import cn from 'classnames';

export const Rating = forwardRef(
  (
    { isEditable = false, rating, error, setRating, tabIndex, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = React.useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    React.useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }
      if (rating == i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updateRatingArray = ratingArray.map((ratingEl: JSX.Element, index: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: index < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplayStar(index + 1)}
            onMouseLeave={() => changeDisplayStar(rating)}
            onClick={() => onClick(index + 1)}
            tabIndex={computeFocus(rating, index)}
            onKeyDown={handleKey}
            ref={(rating) => ratingArrayRef.current?.push(rating)}
            role={isEditable ? 'slider' : ''}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-valuemin={1}
            aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
            aria-invalid={error ? 'true' : 'false'}>
            <StarIcon />
          </span>
        );
      });
      setRatingArray(updateRatingArray);
    };

    const changeDisplayStar = (index: number) => {
      if (!isEditable) return;
      constructRating(index);
    };

    const onClick = (index: number) => {
      if (!isEditable || !setRating) return;
      setRating(index);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        e.preventDefault();
        return;
      }

      if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 0 ? rating - 1 : 0);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div {...props} ref={ref} className={cn(styles.ratingWrapper, { [styles.error]: error })}>
        {ratingArray.map((ratingEl, index) => (
          <span key={index}>{ratingEl}</span>
        ))}
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  },
);
