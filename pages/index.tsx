import { GetStaticProps } from 'next';
import React from 'react';
import axios from 'axios';
import { Htag, Button, Ptag, Tag, Rating, Input } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = React.useState<number>(0);

  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow="right">
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="down">
        Кнопка
      </Button>
      <Ptag size="large" children="Hello world" />
      <Ptag size="small" children="Hello world" />
      <Ptag size="medium" children="Hello world" />
      <Tag size="medium" color="red" href="#">
        Див
      </Tag>
      <Rating rating={rating} setRating={setRating} isEditable />
      <Input placeholder="text" />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
