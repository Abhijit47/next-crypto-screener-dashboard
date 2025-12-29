'use client';
import { ThemeModeToggler } from '@/components/shared/theme-mode-toggler';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Home() {
  return (
    <p className={'text-3xl text--purple-600'}>
      Coin Pulse
      <ThemeModeToggler />
      <Button
        onClick={() => {
          toast('Hit me 🙅🏻‍♂️🙅🏻‍♂️🙅🏻‍♂️🙅🏻‍♂️');
          // toast.success('success');
          // toast.error('success');
          // toast.info('success');
        }}>
        Hit me
      </Button>
    </p>
  );
}
