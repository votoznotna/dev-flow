import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import React from 'react';
import LocalSearch from '@/components/search/LocalSearch';
import HomeFilter from '@/components/filters/HomeFilter';
import QuestionCard from '@/components/cards/QuestionCard';

const questions = [
  `{
      _id: '1',
      title: 'How to create a custom hook in React?',
      description: 'I want to create a custom hook in React to reuse logic across components.',
      tags: [
        { _id: '1', name: 'react' },
        { _id: '2', name: 'hooks' }
      ],
      author: { _id: '1', name: 'John Doe', image: 'https://github.com/shadcn.png' },
      upvotes: 10,
      downvotes: 2,
      answers: 3,
      views: 100,
      createdAt: new Date(),
    }`,
  `{
      _id: '2',
      title: 'How to use JavaScript Query?',
      description: 'I want to use JavaScript Query to fetch data from an API.',
      tags: [
        { _id: '3', name: 'javascript' },
        { _id: '4', name: 'query' }
      ],
      author: { _id: '1', name: 'John Doe', image: 'https://github.com/shadcn.png' },
      upvotes: 10,
      downvotes: 2,
      answers: 3,
      views: 100,
      createdAt: new Date(),
    }`,
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = '', filter } = await searchParams;
  const filteredQuestions = questions
    .map((q) => {
      try {
        // Remove backticks and parse as JS object
        const asObj = eval('(' + q + ')');
        return asObj;
      } catch {
        return null;
      }
    })
    .filter((question) => {
      if (!question || !question.title) return false;

      // Filter by search query
      const matchesQuery =
        !query ||
        question.title.toLowerCase().includes(query.toLowerCase()) ||
        question.description?.toLowerCase().includes(query.toLowerCase());

      // Filter by tag filter
      const matchesFilter =
        !filter ||
        question.tags?.some(
          (tag: { _id: string; name: string }) =>
            tag.name.toLowerCase() === filter.toLowerCase()
        );

      return matchesQuery && matchesFilter;
    });
  // const session = await auth();
  // console.log(session);

  return (
    <>
      <section className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Button
          className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION} className='max-sm:w-full'>
            Ask a Question
          </Link>
        </Button>
      </section>
      <section className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route={ROUTES.HOME}
          imgSrc='/icons/search.svg'
          placeholder='Search questions...'
          iconPosition='left'
          otherClasses='flex-1'
        />
      </section>
      <HomeFilter />
      <div className='mt-10 flex w-full flex-col gap-6'>
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
      <form
        className='px-10 pt-[100px]'
        action={async () => {
          'use server';
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type='submit'>Sign out</Button>
      </form>
    </>
  );
};

export default Home;
