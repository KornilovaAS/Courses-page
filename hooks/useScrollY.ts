// простая функция кот должна вернуть на сколько скролл отсоит от верха

import { useEffect, useState } from 'react';

export const useScrollY = (): number => {
  // проверяем где мы находимся
  const isBrowser = typeof window !== 'undefined';
  // сохраняем текущее положение скролла в стейте
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = () => {
    // текущая позиция нашего скрола
    const scrollCurrentY = isBrowser ? window.scrollY : 0;
    setScrollY(scrollCurrentY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};
